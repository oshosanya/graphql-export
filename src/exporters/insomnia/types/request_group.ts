import { Maybe } from "graphql/jsutils/Maybe";

class RequestGroup {
    _type = "request_group";
    _id: string;
    name: string;
    created: number;
    parentId: Maybe<string>;
    modified: Maybe<number>;
    metaSortKey: Maybe<number>;

    constructor(name: string) {
        const ts = Math.round((new Date()).getTime() / 1000);
        this.name = name;
        this._id = name + ts;
        this.created = ts;
    }

}

export default RequestGroup
