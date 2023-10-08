import {EmbedField} from "../EmbedField.ts";

export class EmbedFieldBuilder {
    private readonly name : string;
    private readonly value : string;
    private readonly inline ?: boolean;

    constructor(name : string, value : string, inline ?: boolean) {
        this.name = name;
        this.value = value;
        this.inline = inline;
    }

    public getName() : string {
        return this.name;
    }

    public getValue() : string {
        return this.value;
    }

    public getInline() : boolean | undefined {
        return this.inline;
    }

    public build() : EmbedField {
        return new EmbedField(this.name, this.value, this.inline);
    }
}