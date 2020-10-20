import { Collection, Folder, Item, Request } from './types';
import Utils from '../../utils'
import Variable from './types/variable';
import type { PostmanRequestBody } from './types/request';
const _ = require('lodash/collection');

class Postman {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        let collection = new Collection;
        collection.info.name = url;
        let baseUrlVar = new Variable('base_url', url);
        collection.addVariable(baseUrlVar);
        const types = schema.data.__schema.types;


        types.forEach(type => {
            if (type.name == rootQueryName || type.name == rootMutationName) {
                let folder = new Folder(type.name);

                type.fields.forEach(query => {
                    let schemaType = type.name == rootQueryName ? "query" : "mutation";
                    let returnType;
                    let returnFields;

                    if (query.type.name != null) {
                        returnType = _.find(types, ['name', query.type.name]);
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if (query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = _.find(types, ['name', query.type.ofType.name]);
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    let item = new Item(query.name);
                    let request = new Request({
                        url: '{{base_url}}',
                        method: 'POST'
                    });
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

    buildRequestBody(schemaType: string, query: any, returnFields: string) : PostmanRequestBody["graphql"] {
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
