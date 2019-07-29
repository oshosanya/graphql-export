'use strict';

import {Insomnia} from './insomnia/insomnia';
import axios from 'axios';

const
    instrospectionQuery = `
        query IntrospectionQuery {
            __schema {
                queryType {
                    name
                }
                mutationType {
                    name
                }
                types {
                    ...FullType
                }
                directives {
                    name
                    description
                    locations
                    args {
                        ...InputValue
                    }
                }
            }
        }
        fragment FullType on __Type {
            kind
            name
            description
            fields(includeDeprecated: true) {
                name
                description
                args {
                    ...InputValue
                }
                type {
                    ...TypeRef
                }
                isDeprecated
                deprecationReason
            }
            inputFields {
                ...InputValue
            }
            interfaces {
                ...TypeRef
            }
            enumValues(includeDeprecated: true) {
                name
                description
                isDeprecated
                deprecationReason
            }
            possibleTypes {
                ...TypeRef
            }
        }
        fragment InputValue on __InputValue {
            name
            description
            type {
                ...TypeRef
            }
            defaultValue
        }
        fragment TypeRef on __Type {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                        ofType {
                            kind
                            name
                            ofType {
                                kind
                                name
                                ofType {
                                    kind
                                    name
                                    ofType {
                                        kind
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    `;

const convert = function (url, converter) {
    const schema = getSchema(url, instrospectionQuery);
    schema
        .then((response) => {
            const insomnia = new Insomnia
            insomnia.convert(response.data, url)
        })
        .catch(err => console.log('Could not introspect graphql server, please check the root url'))
}

const getSchema = (url: string, query: string) => {
    return axios.post(url, {
        query: query
    })
}

export { Insomnia, convert };
