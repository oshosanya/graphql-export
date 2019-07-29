class RequestBody {
    mimeType: string = "application/graphql";
    text: string = "";

    constructor(text: string, variables: string) {
        let tempText: any = {};
        tempText.query = text;
        tempText.variables = variables;
        this.text = JSON.stringify(tempText);
    }
}

export default RequestBody
