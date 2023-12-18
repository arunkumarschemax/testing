import { CommonRequestAttrs } from "../common";

export class UsersIdDto extends CommonRequestAttrs {
    usersId: number;
    constructor(username: string, userId: number, usersId: number) {
        super(username, userId);
        this.usersId = usersId;
    }

}