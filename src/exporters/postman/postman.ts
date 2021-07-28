import { Collection, Folder, Item, Request } from './types';
import Utils from '../../utils'
import Variable from './types/variable';
import type { PostmanRequestBody } from './types/request';
import find = require('lodash/find');
import { IntrospectionField, IntrospectionSchema, IntrospectionType } from 'graphql';

class Postman {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        const collection = new Collection;
        collection.info.name = url;
        const baseUrlVar = new Variable('base_url', url);
        collection.addVariable(baseUrlVar);
        const types: IntrospectionSchema["types"] = schema.data.__schema.types;


        types.forEach(type => {
            if (Utils.isRootQuery(type, rootQueryName) || Utils.isRootMutation(type, rootMutationName)) {
                const folder = new Folder(type.name);

                type.fields.forEach(query => {
                    const schemaType = type.name == rootQueryName ? "query" : "mutation";
                    let returnType: IntrospectionType;
                    let returnFields = "";

                    if ("name" in query.type && query.type.name != null) {
                        returnType = find(types, ['name', query.type.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if ("ofType" in query.type && query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = find(types, ['name', query.type.ofType.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    const item = new Item(query.name);
                    const request = new Request('{{base_url}}', 'POST');
                    request.body.graphql = this.buildRequestBody(schemaType, query, returnFields)
                    item.request = request;
                    folder.addItem(item);
                });
                collection.addItem(folder);
            }
        });
        const data = JSON.stringify(collection, null, 4);
        return data;
    }

    buildRequestBody(schemaType: string, query: IntrospectionField, returnFields: string) : PostmanRequestBody["graphql"] {
        const endpointArgs = Utils.buildEndpointArgs(query.args);
        const queryArgs = Utils.buildQueryArgs(query.args);
        const bodyText =  schemaType+" "+queryArgs+" { \n\t"+query.name+" "+endpointArgs+" {\n"+returnFields+"\n\t} \n}"
        const variables = Utils.buildVariables(query.args);
        return {
            query: bodyText,
            variables: variables
        }
    }
}

export default Postman;
