class Variable {
    id: string;
    key: string;
    value: string;
    type: string;
    name: string;
    description: string;

    constructor (key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export default Variable;