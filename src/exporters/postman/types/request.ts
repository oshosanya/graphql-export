import Header from "./header";

class Request {
    url: string;
    method: string;
    description: string;
    header: Array<Header> = [];
    body: any = {
        mode: 'graphql',
        graphql: {
            query: '',
            variables: '',
        }
    }
}

export default Request;