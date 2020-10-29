import Variable from './variable'
import Item from './item';

class Folder {
    name: string = "";
    description: string = "";
    variables: Array<Variable> = [];
    items: Array<Item> = [];

    constructor (name: string) {
        this.name = name;
    }
    addVariable (variable: Variable) {
        this.variables.push(variable);
    }

    addItem (item: Item) {
        this.items.push(item);
    }
}

export default Folder;
