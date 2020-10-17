import axios from 'axios';
import Insomnia from './insomnia/insomnia';
import Postman from './postman/postman';

const fs = require('fs');
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

const convert = async function (url: string, converter: string, rootQueryName: string, rootMutationName: string, headers: Array<string>) {
    let requestHeaders: Record<string, string> = {};
    headers.forEach(header => {
        const [key, value] = header.split(':');
        requestHeaders[key.trim()] = value.trim();
    });

    const formatConverter = require(`./${converter}/${converter}`);

    try {
        let response = await getSchema(url, instrospectionQuery, requestHeaders);
        const converter: Insomnia | Postman = Object.create(formatConverter.default.prototype)
        let data = converter.convert(response.data, url, rootQueryName, rootMutationName)
        fs.writeFileSync('export.json', data);
        console.log("File saved to export.json");
    } catch (err) {
        console.log(err);
        console.log('Could not introspect graphql server, please check the root url')
    }
}

const getSchema = (url: string, query: string, requestHeaders: object) => {
    return axios.post(url, {
        query: query,
        headers: requestHeaders
    })
}

export { convert };
