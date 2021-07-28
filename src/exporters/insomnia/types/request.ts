import { Maybe } from 'graphql/jsutils/Maybe';
import { HTTPMethod } from '../../../@types/global';
import RequestBody from './request_body';

class Request {
    _type = "request";
    _id: string;
    created: number;
    name: string;
    method: HTTPMethod = "POST";
    headers: any[] = [];
    parentId: Maybe<string>;
    modified: Maybe<number>;
    url: Maybe<string>;
    body: Maybe<RequestBody>;

    constructor(name: string) {
        const ts = Math.round((new Date()).getTime() / 1000);
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
