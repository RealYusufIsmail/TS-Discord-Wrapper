import {EmbedThumbnail} from "../EmbedThumbnail.ts";

export class EmbedThumbnailBuilder {
    private readonly url : string;
    private readonly proxyUrl ?: string;
    private readonly height ?: number;
    private readonly width ?: number;

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

    public build() : EmbedThumbnail {
        return new EmbedThumbnail(this.url, this.proxyUrl, this.height, this.width);
    }
}