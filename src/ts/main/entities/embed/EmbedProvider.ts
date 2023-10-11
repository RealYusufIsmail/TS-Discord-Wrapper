export declare interface EmbedProvider {
    /**
     * The name of the provider
     */
    name ?: string;

    /**
     * The url of the provider
     */
    url ?: string;

    /**
     * Converts this provider to json
     */
    toJson(): any;
}

export class EmbedProvider {
    name ?: string;
    url ?: string;

    constructor(name ?: string, url ?: string) {
        this.name = name;
        this.url = url;
    }

    public getName() : string | undefined {
        return this.name;
    }

    public getUrl() : string | undefined {
        return this.url;
    }

    public static fromJson(data : any) : EmbedProvider {
        return new EmbedProvider(data.name,
            data.url ? data.url : undefined);
    }

    public toJson() : any {
        return {
            name: this.name,
            url: this.url
        };
    }
}