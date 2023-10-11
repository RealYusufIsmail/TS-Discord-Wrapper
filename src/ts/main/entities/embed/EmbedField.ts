export declare interface EmbedField {
    /**
     * The name of the field
     */
    name : string;

    /**
     * The value of the field
     */
    value : string;

    /**
     * Whether the field is inline
     */
    inline ?: boolean;

    /**
     * Converts this field to json
     */
    toJson(): any;
}

export class EmbedField {
    name : string;
    value : string;
    inline ?: boolean;

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

    public static fromJson(data : any) : EmbedField {
        return new EmbedField(data.name,
            data.value,
            data.inline ? data.inline : undefined);
    }

    public toJson() : any {
        return {
            name: this.name,
            value: this.value,
            inline: this.inline
        };
    }
}