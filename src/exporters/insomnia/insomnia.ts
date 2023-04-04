import { Root, RequestGroup, Request, RequestBody } from './types';
import find = require('lodash/find');
import type { IntrospectionField, IntrospectionScalarType, IntrospectionSchema, IntrospectionType } from 'graphql'
import Utils from "../../utils";

class Insomnia {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        const rootExport = new Root;
        const types: IntrospectionSchema["types"] = schema.data.__schema.types;
        const graphQLRequestsGroup = new RequestGroup(url);
        rootExport.addResource(graphQLRequestsGroup);

        types.forEach(type => {
            if (Utils.isRootQuery(type, rootQueryName) || Utils.isRootMutation(type, rootMutationName)) {
                const requestGroup = new RequestGroup(type.name)
                requestGroup.parentId = graphQLRequestsGroup._id;
                rootExport.addResource(requestGroup);

                type.fields.forEach(query => {
                    const request = new Request(query.name);
                    request.url = url
                    request.parentId = requestGroup._id;
                    let returnType: IntrospectionType;
                    let returnFields = "";

                    if ("name" in query.type && query.type.name != null) {
                        returnType = find(types, ['name', query.type.name]) as IntrospectionType;
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    if ("ofType" in query.type && query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = find(types, ['name', (query.type.ofType as IntrospectionScalarType).name]) as IntrospectionType; // eslint-disable-line
                        returnFields = Utils.buildReturnFields(returnType);
                    }

                    const schemaType = type.name == rootQueryName ? "query" : "mutation";
                    request.body = this.buildRequestText(schemaType, query, returnFields);
                    rootExport.addResource(request);
                })
            }
        })
        const data = JSON.stringify(rootExport, null, 4);
        return data;
    }

    buildRequestText(schemaType: string, query: IntrospectionField, returnFields: string): RequestBody {
        const endpointArgs = Utils.buildEndpointArgs(query.args);
        const queryArgs = Utils.buildQueryArgs(query.args);
        const bodyText = schemaType + " " + queryArgs + " { \n\t" + query.name + " " + endpointArgs + " {\n" + returnFields + "\n\t} \n}"
        const variables = Utils.buildVariables(query.args);
        const requestBody: RequestBody = new RequestBody(bodyText, variables);
        return requestBody
    }
}

export default Insomnia;
