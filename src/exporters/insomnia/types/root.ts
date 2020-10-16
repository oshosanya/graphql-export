class Root {
    _type: string = "export";
    __export_format: number = 3;
    resources: any[] = [];
    __export_date: Maybe<string>;
    __export_source: Maybe<string>;

    addResource(resource: any) {
        this.resources.push(resource);
    }
}

export default Root
