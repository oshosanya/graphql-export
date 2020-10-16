class Variable {
    key: string;
    value: string;
    id: Maybe<string>;
    type: Maybe<string>;
    name: Maybe<string>;
    description: Maybe<string>;

    constructor (key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export default Variable;
