import { GlobalResponseObject } from "../common"; 
import { SubMenuDropDownDto } from "./sub-menu.dto.dropdown";

export class SubMenusDropDownResponse extends GlobalResponseObject {
    data?: SubMenuDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: SubMenuDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}