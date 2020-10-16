import Header from "./header";

const defaultBody = {
    mode: 'graphql',
    graphql: {
        query: '',
        variables: '',
    }
} as const

export interface PostmanRequestBody {
    mode: 'graphql';
    graphql: {
        query: string;
        variables: string;
    }
}

class Request {
    url: string
    method: HTTPMethod
    description: Maybe<string>;
    headers: Array<Header>
    body: PostmanRequestBody

    constructor({ url, method, headers = [], body = defaultBody }) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
}

export default Request;
