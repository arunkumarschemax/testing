import { GlobalResponseObject } from "../common";
import { UserRoleDto } from "./user-roles.dto";



export class UserRolesResponse extends GlobalResponseObject {
    data?: UserRoleDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: UserRoleDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}