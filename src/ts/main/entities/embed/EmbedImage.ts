export declare interface EmbedImage {
    /**
     * The url of the image
     */
    url : string;

    /**
     * The proxy url of the image
     */
    proxyUrl ?: string;

    /**
     * The height of the image
     */
    height ?: number;

    /**
     * The width of the image
     */
    width ?: number;

    /**
     * Converts this image to json
     */
    toJson(): any;
}

export class EmbedImage {
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

    public static fromJson(data : any) : EmbedImage {
        return new EmbedImage(data.url,
            data.proxy_url ? data.proxy_url : undefined,
            data.height ? data.height : undefined,
            data.width ? data.width : undefined);
    }

    public toJson() : any {
        return {
            url: this.url,
            proxy_url: this.proxyUrl,
            height: this.height,
            width: this.width
        };
    }
}