import {EmbedAuthor} from "../EmbedAuthor.ts";

export class EmbedAuthorBuilder {
    private readonly name : string;
    private readonly url ?: string;
    private readonly iconUrl ?: string;
    private readonly proxyIconUrl ?: string;

    constructor(name : string, url ?: string, iconUrl ?: string, proxyIconUrl ?: string) {
        this.name = name;
        this.url = url;
        this.iconUrl = iconUrl;
        this.proxyIconUrl = proxyIconUrl;
    }

    getName() : string {
        return this.name;
    }

    getUrl() : string | undefined {
        return this.url;
    }

    getIconUrl() : string | undefined {
        return this.iconUrl;
    }

    getProxyIconUrl() : string | undefined {
        return this.proxyIconUrl;
    }

    public build() : EmbedAuthor {
        return new EmbedAuthor(this.name, this.url, this.iconUrl, this.proxyIconUrl);
    }
}