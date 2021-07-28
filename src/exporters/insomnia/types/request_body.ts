class RequestBody {
    mimeType = "application/graphql";
    text = "";

    constructor(text: string, variables: string) {
        const tempText: any = {};
        tempText.query = text;
        tempText.variables = variables;
        this.text = JSON.stringify(tempText);
    }
}

export default RequestBody
