import Variable from './variable'
import Item from './item';

class Folder {
    name: string = "";
    description: string = "";
    variable: Array<Variable> = [];
    item: Array<Item> = [];

    constructor (name: string) {
        this.name = name;
    }
    addVariable (variable: Variable) {
        this.variable.push(variable);
    }

    addItem (item: Item) {
        this.item.push(item);
    }
}

export default Folder;