import {EmbedFooter} from "../EmbedFooter.ts";

export class EmbedFooterBuilder {
    private readonly text : string;
    private readonly iconUrl ?: string;
    private readonly proxyIconUrl ?: string;

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

    public build() : EmbedFooter {
        return new EmbedFooter(this.text, this.iconUrl, this.proxyIconUrl);
    }
}