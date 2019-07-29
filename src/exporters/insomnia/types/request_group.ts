class RequestGroup {
    _type: string = "request_group";
    _id: string;
    name: string;
    parentId: string;
    created: number;
    modified: number;
    metaSortKey: number;

    constructor(name: string) {
        var ts = Math.round((new Date()).getTime() / 1000);
        this.name = name;
        this._id = name + ts;
        this.created = ts;
    }

}

export default RequestGroup
