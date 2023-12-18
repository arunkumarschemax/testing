import { GlobalResponseObject } from "../../../shared-models/src/common"; 
import { GetAllRolePermissionDropDownDto } from "./role-perm.dropdown";

export class GetAllRolePermissionsDropDownResponse extends GlobalResponseObject {
    data?: GetAllRolePermissionDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllRolePermissionDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}