import { Collection, Folder, Item, Request } from './types';
import Utils from '../../utils'
import Variable from './types/variable';
import type { PostmanRequestBody } from './types/request';
import find = require('lodash/find');
import { IntrospectionField, IntrospectionSchema, IntrospectionType } from 'graphql';

class Postman {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        let collection = new Collection;
        collection.info.name = url;
        let baseUrlVar = new Variable('base_url', url);
        collection.addVariable(baseUrlVar);
        const types: IntrospectionSchema["types"] = schema.data.__schema.types;


        types.forEach(type => {
            if (Utils.isRootQuery(type, rootQueryName) || Utils.isRootMutation(type, rootMutationName)) {
                let folder = new Folder(type.name);

                type.fields.forEach(query => {
                    let schemaType = type.name == rootQueryName ? "query" : "mutation";
                    let returnType:  IntrospectionType;
                    let returnFields: string = "";

                    if ("name" in query.type && query.type.name != null) {
                        returnType = find(types, ['name', query.type.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if ("ofType" in query.type && query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = find(types, ['name', query.type.ofType.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    let item = new Item(query.name);
                    let request = new Request('{{base_url}}', 'POST');
                    request.body.graphql = this.buildRequestBody(schemaType, query, returnFields)
                    item.request = request;
                    folder.addItem(item);
                });
                collection.addItem(folder);
            }
        });
        let data = JSON.stringify(collection, null, 4);
        return data;
    }

    buildRequestBody(schemaType: string, query: IntrospectionField, returnFields: string) : PostmanRequestBody["graphql"] {
        let endpointArgs = Utils.buildEndpointArgs(query.args);
        let queryArgs = Utils.buildQueryArgs(query.args);
        let bodyText =  schemaType+" "+queryArgs+" { \n\t"+query.name+" "+endpointArgs+" {\n"+returnFields+"\n\t} \n}"
        let variables = Utils.buildVariables(query.args);
        return {
            query: bodyText,
            variables: variables
        }
    }
}

export default Postman;
