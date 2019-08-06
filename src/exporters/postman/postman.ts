import { Collection, Folder, Item, Request } from './types';
import Utils from '../../utils'
import Variable from './types/variable';
const _ = require('lodash');

class Postman {
    convert(schema: any, url: string) {
        let collection = new Collection;
        collection.info.name = url;
        let baseUrlVar = new Variable('base_url', url);
        collection.addVariable(baseUrlVar);
        const types = schema.data.__schema.types;
        let type: any;

        types.forEach(type => {
            if (type.name == "RootQueryType" || type.name == "RootMutationType") {
                let folder = new Folder(type.name);
                let query: any;
                type.fields.forEach(query => {
                    let schemaType = type.name == "RootQueryType" ? "query" : "mutation";
                    let returnType;
                    let returnFields;

                    if (query.type.name != null) {
                        returnType = _.find(types, ['name', query.type.name]);
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if (query.type.ofType != null) {
                        returnType = _.find(types, ['name', query.type.ofType.name]);
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    let item = new Item(query.name);
                    let request = new Request;
                    request.url = '{{base_url}}';
                    request.method = 'POST';
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

    buildRequestBody(schemaType: string, query: any, returnFields: string) : object {
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