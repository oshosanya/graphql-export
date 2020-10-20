class Header {
    key: string;
    value: string;
    disabled: boolean = false;
    description: Maybe<string>;

    constructor (key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export default Header;
