import { GlobalResponseObject } from "../common";
import { MenusDropdownDto } from "./drop-down-dto";



export class MenusDropDownResponse extends GlobalResponseObject{
    data?: MenusDropdownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: MenusDropdownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }
}