class Root {
    _type: string = "export";
    __export_format: number = 3;
    __export_date: string;
    __export_source: string;
    resources: any[] = [];

    addResource(resource: any) {
        this.resources.push(resource);
    }
}

export default Root
