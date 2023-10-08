export declare interface EmbedAuthor {
    /**
     * The text of the footer
     */
    text : string;

    /**
     * The url of this author.
     */
    url ?: string;

    /**
     * The icon url of the footer
     */
    iconUrl ?: string;

    /**
     * The proxy icon url of the footer
     */
    proxyIconUrl ?: string;
}

export class EmbedAuthor {
    text : string;
    url ?: string;
    iconUrl ?: string;
    proxyIconUrl ?: string;

    constructor(text : string, url ?: string, iconUrl ?: string, proxyIconUrl ?: string) {
        this.text = text;
        this.url = url;
        this.iconUrl = iconUrl;
        this.proxyIconUrl = proxyIconUrl;
    }

    public getText() : string {
        return this.text;
    }

    public getUrl() : string | undefined {
        return this.url;
    }

    public getIconUrl() : string | undefined {
        return this.iconUrl;
    }

    public getProxyIconUrl() : string | undefined {
        return this.proxyIconUrl;
    }

    public static fromJson(data : any) : EmbedAuthor {
        return new EmbedAuthor(data.text,
            data.url ? data.url : undefined,
            data.icon_url ? data.icon_url : undefined,
            data.proxy_icon_url ? data.proxy_icon_url : undefined);
    }
}