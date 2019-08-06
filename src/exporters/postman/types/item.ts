import Variable from "./variable";
import Request from "./request";

class Item {
    id: string;
    name: string;
    description: string;
    variable: Array<Variable> = [];
    request: Request;

    constructor (name: string) {
        this.name = name;
    }
}

export default Item;