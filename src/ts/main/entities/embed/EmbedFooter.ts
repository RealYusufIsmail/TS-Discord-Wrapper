export declare interface EmbedFooter {
    /**
     * The text of the footer
     */
    text : string;

    /**
     * The icon url of the footer
     */
    iconUrl ?: string;

    /**
     * The proxy icon url of the footer
     */
    proxyIconUrl ?: string;
}

export class EmbedFooter {
    text : string;
    iconUrl ?: string;
    proxyIconUrl ?: string;

    constructor(text : string, iconUrl ?: string, proxyIconUrl ?: string) {
        this.text = text;
        this.iconUrl = iconUrl;
        this.proxyIconUrl = proxyIconUrl;
    }

    public getText() : string {
        return this.text;
    }

    public getIconUrl() : string | undefined {
        return this.iconUrl;
    }

    public getProxyIconUrl() : string | undefined {
        return this.proxyIconUrl;
    }

    public static fromJson(data : any) : EmbedFooter {
        return new EmbedFooter(data.text,
            data.icon_url ? data.icon_url : undefined,
            data.proxy_icon_url ? data.proxy_icon_url : undefined);
    }
}