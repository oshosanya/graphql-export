import { IntrospectionInputValue, IntrospectionObjectType, IntrospectionType } from "graphql";

class Utils {

    static buildQueryArgs(args : readonly any[]) : string {
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

    static buildEndpointArgs(args: readonly IntrospectionInputValue[]) : string {
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

    static buildVariables(args: readonly IntrospectionInputValue[]) : string {
        let variables: Record<string, string> = {};
        for (let i = 0; i < args.length; i++) {
            variables[args[i].name] = '';
        }
        return JSON.stringify(variables);
    }

    static buildReturnFields(returnType: IntrospectionType) : string {

        let returnValues: string = '';

        if ("fields" in returnType && returnType['fields']) {
            returnType.fields.forEach((field, idx) => {
                returnValues += '\t\t' + (field.name + (idx == returnType.fields.length - 1 ? '' : '\n'));
            })
        }
        return returnValues;
    }

    static isRootQuery(type: IntrospectionType, rootQueryName: string): type is IntrospectionObjectType {
        return type.name === rootQueryName;
    }

    static isRootMutation(type: IntrospectionType, rootMutationName: string): type is IntrospectionObjectType {
        return type.name === rootMutationName;
    }
}

export default Utils;
