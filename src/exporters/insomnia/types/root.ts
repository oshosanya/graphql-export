import { Maybe } from "graphql/jsutils/Maybe";

class Root {
    _type = "export";
    __export_format = 3;
    resources: any[] = [];
    __export_date: Maybe<string>;
    __export_source: Maybe<string>;

    addResource(resource: any) {
        this.resources.push(resource);
    }
}

export default Root
