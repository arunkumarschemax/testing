import { GlobalResponseObject } from "../common"; 
import { GetAllRolesDropDown } from "./roles.dto copy";


export class GetAllRolesDropDownResponse extends GlobalResponseObject {
    data?: GetAllRolesDropDown[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllRolesDropDown[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}