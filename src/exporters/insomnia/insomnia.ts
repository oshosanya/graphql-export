import { Root, RequestGroup, Request, RequestBody } from './types';
import find = require('lodash/find');
import type { IntrospectionField, IntrospectionSchema, IntrospectionType } from 'graphql'
import Utils from "../../utils";

class Insomnia {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        let rootExport = new Root;
        const types: IntrospectionSchema["types"] = schema.data.__schema.types;
        let graphQLRequestsGroup = new RequestGroup(url);
        rootExport.addResource(graphQLRequestsGroup);

        types.forEach(type => {
            if (Utils.isRootQuery(type, rootQueryName) || Utils.isRootMutation(type, rootMutationName)) {
                let requestGroup = new RequestGroup(type.name)
                requestGroup.parentId = graphQLRequestsGroup._id;
                rootExport.addResource(requestGroup);

                type.fields.forEach(query => {
                    let request = new Request(query.name);
                    request.url = url
                    request.parentId = requestGroup._id;
                    let returnType: IntrospectionType;
                    let returnFields: string = "";

                    if ("name" in query.type && query.type.name != null) {
                        returnType = find(types, ['name', query.type.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if ("ofType" in query.type && query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = find(types, ['name', query.type.ofType.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    let schemaType = type.name == rootQueryName ? "query" : "mutation";
                    request.body = this.buildRequestText(schemaType, query, returnFields);
                    rootExport.addResource(request);
                })
            }
        })
        let data = JSON.stringify(rootExport, null, 4);
        return data;
    }

    buildRequestText(schemaType: string, query: IntrospectionField, returnFields: string) : RequestBody {
        let endpointArgs = Utils.buildEndpointArgs(query.args);
        let queryArgs = Utils.buildQueryArgs(query.args);
        let bodyText =  schemaType+" "+queryArgs+" { \n\t"+query.name+" "+endpointArgs+" {\n"+returnFields+"\n\t} \n}"
        let variables = Utils.buildVariables(query.args);
        let requestBody: RequestBody = new RequestBody(bodyText, variables);
        return requestBody
    }
}

export default Insomnia;
