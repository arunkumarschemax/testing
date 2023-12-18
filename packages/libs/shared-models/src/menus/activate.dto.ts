import { CommonRequestAttrs } from "../common";

export class MenuIdReqDto extends CommonRequestAttrs {
    menuId: number;
    constructor(username: string, userId: number, menuId: number) {
        super(username, userId);
        this.menuId = menuId;
    }
}