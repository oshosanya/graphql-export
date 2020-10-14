import axios from 'axios';
import { Root, RequestGroup, Request, RequestBody } from './types';
const _ = require('lodash');

class Insomnia {
    convert(schema: any, url: string, rootQueryName: string, rootMutationName: string): string {
        let rootExport = new Root;
        const types = schema.data.__schema.types;
        let graphQLRequestsGroup = new RequestGroup(url);
        rootExport.addResource(graphQLRequestsGroup);

        types.forEach(type => {
            if (type.name == rootQueryName || type.name == rootMutationName) {
                let requestGroup = new RequestGroup(type.name)
                requestGroup.parentId = graphQLRequestsGroup._id;
                rootExport.addResource(requestGroup);

                type.fields.forEach(query => {
                    let request = new Request(query.name);
                    request.url = url
                    request.parentId = requestGroup._id;
                    let returnType;
                    let returnFields;

                    if (query.type.name != null) {
                        returnType = _.find(types, ['name', query.type.name]);
                        returnFields = this.buildReturnFields(returnType);
                    }

                    if (query.type.ofType != null && query.type.ofType.kind !== "LIST") {
                        returnType = _.find(types, ['name', query.type.ofType.name]);
                        returnFields = this.buildReturnFields(returnType);
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

    buildRequestText(schemaType: string, query: any, returnFields: string) : RequestBody {
        let endpointArgs = this.buildEndpointArgs(query.args);
        let queryArgs = this.buildQueryArgs(query.args);
        let bodyText =  schemaType+" "+queryArgs+" { \n\t"+query.name+" "+endpointArgs+" {\n"+returnFields+"\n\t} \n}"
        let variables = this.buildVariables(query.args);
        let requestBody: RequestBody = new RequestBody(bodyText, variables);
        return requestBody
    }

    buildQueryArgs(args : any[]) : string {
        if (args.length == 0) {
            return '';
        }

        let argString = `(`;
        for (let i = 0; i < args.length; i++) {
            if (args[i].type.kind == 'LIST') {
                argString += `$${args[i].name}: [${args[i].type.ofType.name}]`
            } else {
                argString += `$${args[i].name}: ${args[i].type.name}`
            }
            if (i != args.length - 1) {
                argString += ','
            }
        }
        argString += ')'
        return argString;
    }

    buildEndpointArgs(args: any[]) : string {
        if (args.length == 0) {
            return '';
        }

        let argString = `(`;
        for (let i = 0; i < args.length; i++) {
            argString += `${args[i].name}: $${args[i].name}`
            if (i != args.length - 1) {
                argString += ','
            }
        }
        argString += ')'
        return argString;
    }

    buildVariables(args: any[]) : string {
        let variables = {};
        for (let i = 0; i < args.length; i++) {
            variables[args[i].name] = '';
        }
        return JSON.stringify(variables);
    }

    buildReturnFields(returnType: any) : string {

        let returnValues: string = '';
        returnType.fields.forEach((field, idx) => {
            returnValues += '\t\t' + (field.name + (idx == returnType.fields.length - 1 ? '' : '\n'));
        })
        return returnValues
    }
}

export default Insomnia ;
