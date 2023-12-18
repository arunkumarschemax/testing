import { CommonRequestAttrs } from "../common";

export class ScopesIdDto extends CommonRequestAttrs{
    scopeId: number;
    constructor(username: string, userId: number,scopeId: number) {
        super(username, userId)
        this.scopeId = scopeId;
    }
}