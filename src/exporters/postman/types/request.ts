import Header from "./header";

const defaultBody = () => ({
    mode: 'graphql',
    graphql: {
        query: '',
        variables: '',
    }
} as const)

export interface PostmanRequestBody {
    mode: 'graphql';
    graphql: {
        query: string;
        variables: string;
    }
}

class Request {
    constructor(
        public url: string,
        public method: HTTPMethod,
        public description?: Maybe<string>,
        public headers: Array<Header> = [],
        public body: PostmanRequestBody = defaultBody(),
    ) {
        this.url = url;
        this.method = method;
        this.description = description;
        this.headers = headers;
        this.body = body;
    }
}

export default Request;
