import { CommonRequestAttrs } from "../common/common-request-attr.model";

export class ActivatePermissionDto extends CommonRequestAttrs {
    id: number;
    constructor(username: string, userId: number, id: number) {
        super(username, userId);
        this.id = id;
    }
}