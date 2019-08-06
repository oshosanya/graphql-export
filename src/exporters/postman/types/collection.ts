import Variable from "./variable";

class Collection {
    info: any = {
        name: '',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    };
    item: Array<object> = [];
    variable: Array<Variable> = [];

    addItem(item: any) {
        this.item.push(item);
    }

    addVariable(variable: Variable) {
        this.variable.push(variable);
    }
}

export default Collection
