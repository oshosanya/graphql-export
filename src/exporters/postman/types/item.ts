import Variable from "./variable";
import Request from "./request";
import {Maybe} from "../../../@types/global";

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
