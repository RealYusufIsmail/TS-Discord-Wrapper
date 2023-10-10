export declare interface EmbedThumbnail {
    /**
     * The url of the thumbnail
     */
    url : string;

    /**
     * The proxy url of the thumbnail
     */
    proxyUrl ?: string;

    /**
     * The height of the thumbnail
     */
    height ?: number;

    /**
     * The width of the thumbnail
     */
    width ?: number;
}

export class EmbedThumbnail {
    url : string;
    proxyUrl ?: string;
    height ?: number;
    width ?: number;

    constructor(url : string, proxyUrl ?: string, height ?: number, width ?: number) {
        this.url = url;
        this.proxyUrl = proxyUrl;
        this.height = height;
        this.width = width;
    }

    public getUrl() : string {
        return this.url;
    }

    public getProxyUrl() : string | undefined {
        return this.proxyUrl;
    }

    public getHeight() : number | undefined {
        return this.height;
    }

    public getWidth() : number | undefined {
        return this.width;
    }

    public static fromJson(data : any) : EmbedThumbnail {
        return new EmbedThumbnail(data.url,
            data.proxy_url ? data.proxy_url : undefined,
            data.height ? data.height : undefined,
            data.width ? data.width : undefined);
    }
}