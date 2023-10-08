export declare interface EmbedProvider {
    /**
     * The name of the provider
     */
    name ?: string;

    /**
     * The url of the provider
     */
    url ?: string;
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
}