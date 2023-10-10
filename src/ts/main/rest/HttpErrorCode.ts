export enum HttpErrorCode {
    //OK = 200,
    //CREATED = 201,
    //NO_CONTENT = 204,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    TOO_MANY_REQUESTS = 429,
    GATEWAY_UNAVAILABLE = 502,
    SERVER_ERROR = 510
}

export class HttpErrorCodeInfo {

    static contain(code : number) : boolean {
        return code in HttpErrorCode;
    }

    static get(code : number) : HttpErrorCode {
        return code in HttpErrorCode ? code : HttpErrorCode.SERVER_ERROR;
    }
}