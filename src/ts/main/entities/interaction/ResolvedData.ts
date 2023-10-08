import {User} from "../User.ts";
import {Member} from "../guild/Member.ts";

export declare interface ResolvedData {

    /**
     * The users resolved from the interaction
     */
    users: Map<string, User>;

    /**
     * The members resolved from the interaction
     */
    members: Map<string, Member>;
}

export class ResolvedData {
    users: Map<string, User>;
    members: Map<string, Member>;

    constructor(users: Map<string, User>, members: Map<string, Member>) {
        this.users = users;
        this.members = members;
    }

    static fromJson(json: any): ResolvedData {
        return new ResolvedData(
            new Map(Object.entries(json.users).map(([key, value]) => [key, User.fromJson(value)])),
            new Map(Object.entries(json.members).map(([key, value]) => [key, Member.fromJson(value)]))
        );
    }
}