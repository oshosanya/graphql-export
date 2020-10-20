import Variable from "./variable";
import Request from "./request";

class Item {
    name: string;
    variable: Array<Variable> = [];
    id: Maybe<string>;
    description: Maybe<string>;
    request: Maybe<Request>;

    constructor (name: string) {
        this.name = name;
    }
}

export default Item;
