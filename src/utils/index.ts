class Utils {

    static buildQueryArgs(args : any[]) : string {
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

    static buildEndpointArgs(args: any[]) : string {
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

    static buildVariables(args: any[]) : string {
        let variables = {};
        for (let i = 0; i < args.length; i++) {
            variables[args[i].name] = '';
        }
        return JSON.stringify(variables);
    }

    static buildReturnFields(returnType: any) : string {

        let returnValues: string = '';
        returnType.fields.forEach((field, idx) => {
            returnValues += '\t\t' + (field.name + (idx == returnType.fields.length - 1 ? '' : '\n'));
        })
        return returnValues
    }
}

export default Utils;