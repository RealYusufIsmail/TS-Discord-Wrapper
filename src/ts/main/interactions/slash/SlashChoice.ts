export class SlashChoice {
    private readonly name: string;
    private readonly value: string | number;

    constructor(name: string, value: string | number) {
        this.name = name;
        this.value = value;
    }

    public toJson(): any {
        return {
            name: this.name,
            value: this.value
        };
    }
}