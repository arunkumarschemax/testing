import { GlobalResponseObject } from "../../../shared-models/src/common";
import { RolePermissionDto } from "./role-perm.dto";

export class GetAllRolePermissionsResponse extends GlobalResponseObject {
    data?: RolePermissionDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: RolePermissionDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}