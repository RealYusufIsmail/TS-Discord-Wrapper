import {TSDiscordWrapper} from "../TSDiscordWrapper.ts";
import {Api, DefaultApiException, DefaultResponseProcessor} from "rest-api-handler";
import {TSDiscordWrapperInfo} from "../TSDiscordWrapperInfo.ts";
import {HttpErrorCodeInfo} from "./HttpErrorCode.ts";

export class RestAPIHandler {
    private readonly token: string;
    private tSDiscordWrapper: TSDiscordWrapper;

    constructor(token: string, tSDiscordWrapper: TSDiscordWrapper) {
        this.token = token;
        this.tSDiscordWrapper = tSDiscordWrapper;
    }


    getApi() {
        return new Api(TSDiscordWrapperInfo.REST_API_URL,  [
            new DefaultResponseProcessor(DefaultApiException),
        ], {
            'Content-Type': 'application/json',
            Authorization: `Bot ${this.token}`,
            'user-agent': `DiscordBot ( https://www.npmjs.com/package/ts-discord-wrapper, ${this.tSDiscordWrapper.version} )`,
            'accept-encoding': 'json'
        });
    }

    async performGetRequest(endpoint: string, params ?: string[]): Promise<any> {
        endpoint = this.checkIfContainsParams(endpoint, params);

        return this.getApi().get(TSDiscordWrapperInfo.REST_API_URL + endpoint).then((response) => {
            this.performErrorHandling(response.status);
            return response;
        }).catch((exception) => {
            if (exception instanceof DefaultApiException) {
                this.performErrorHandling(exception.getResponse().status, exception.getRequest().url + " " + JSON.stringify(exception.getResponse().data));
            } else {
                this.tSDiscordWrapper.logger.error("unknown exception: " + exception);
            }
        });
    }

    async performPostRequest(endpoint: string, body: any, params ?: string[]): Promise<any> {
        endpoint = this.checkIfContainsParams(endpoint, params);
        return this.getApi().post(TSDiscordWrapperInfo.REST_API_URL + endpoint, body).then((response) => {
            this.performErrorHandling(response.status);

            return response;
        }).catch((exception) => {
            if (exception instanceof DefaultApiException) {
                this.performErrorHandling(exception.getResponse().status, exception.getRequest().url + " " + JSON.stringify(exception.getResponse().data));
            } else {
                this.tSDiscordWrapper.logger.error("unknown exception: " + exception);
            }
        });
    }

    async performDeleteRequest(endpoint: string, params ?: string[]): Promise<any> {
        endpoint = this.checkIfContainsParams(endpoint, params);

        return this.getApi().delete(TSDiscordWrapperInfo.REST_API_URL + endpoint).then((response) => {
            return;
        }).catch((exception) => {
            if (exception instanceof DefaultApiException) {
                this.performErrorHandling(exception.getResponse().status, exception.getRequest().url + " " + JSON.stringify(exception.getResponse().data));
            } else {
                this.tSDiscordWrapper.logger.error("unknown exception: " + exception);
            }
        });
    }

    checkIfContainsParams(endpoint: string, params ?: string[]) : string {
        if (endpoint.includes("%s") && params == null) {
            throw new Error("Endpoint requires params but none were provided");
        } else if (endpoint.includes("%s") && params != null) {
            let newEndpoint = endpoint;
            for (let i = 0; i < params.length; i++) {
                newEndpoint = newEndpoint.replace("%s", params[i]);
            }

            return newEndpoint;
        } else if (!endpoint.includes("%s") && params != null) {
            return endpoint
        } else {
            return endpoint;
        }
    }

    performErrorHandling(status: number, errorBody ?: any) {
        if (status == undefined) {
            throw new Error("Received undefined error code");
        }

        if (HttpErrorCodeInfo.contain(status)) {
            throw new Error("Received error code: " + HttpErrorCodeInfo.get(status) + " with body: " + errorBody);
        }
    }
}