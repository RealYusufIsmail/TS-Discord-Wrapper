export declare interface EmbedVideo {

    /**
     * The url of the video
     */
    url ?: string;

    /**
     * The proxy url of the video
     */
    proxyUrl ?: string;

    /**
     * The height of the video
     */
    height ?: number;

    /**
     * The width of the video
     */
    width ?: number;
}

export class EmbedVideo {
    url ?: string;
    proxyUrl ?: string;
    height ?: number;
    width ?: number;

    constructor(url ?: string, proxyUrl ?: string, height ?: number, width ?: number) {
        this.url = url;
        this.proxyUrl = proxyUrl;
        this.height = height;
        this.width = width;
    }

    public getUrl() : string | undefined {
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

    public static fromJson(data : any) : EmbedVideo {
        return new EmbedVideo(data.url,
            data.proxy_url ? data.proxy_url : undefined,
            data.height ? data.height : undefined,
            data.width ? data.width : undefined);
    }
}