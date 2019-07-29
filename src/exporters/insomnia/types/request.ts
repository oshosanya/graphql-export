import RequestBody from './request_body';

class Request {
    _type: string = "request";
    _id: string;
    parentId: string;
    created: number;
    modified: number;
    name: string;
    method: string = "POST";
    url: string;
    body: RequestBody;
    headers: any[] = [];

    constructor(name: string) {
        var ts = Math.round((new Date()).getTime() / 1000);
        this.name = name;
        this._id = name + ts;
        this.created = ts;
        this.headers.push({
            'name': 'Content-Type',
            'value': 'application/json',
            'disabled': false
        });
    }
}

export default Request
