import { GlobalResponseObject } from "../common";
import { MenusDto } from "./menus-dto";

export class GetAllMenusResponse extends GlobalResponseObject{
    data?: MenusDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: MenusDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}