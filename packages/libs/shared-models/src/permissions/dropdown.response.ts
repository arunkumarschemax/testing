import { GlobalResponseObject } from "../common";
import { DropdownPermissionsDto } from "./dropdown.dto";

export class DropdownPermissionResponse extends GlobalResponseObject {
    data?: DropdownPermissionsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DropdownPermissionsDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}