import { GlobalResponseObject } from "../common/global-response-object";
import { PermissionsDto } from "./permissions.dto";

export class GetAllPermissionResponse extends GlobalResponseObject{
    data?: PermissionsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: PermissionsDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}