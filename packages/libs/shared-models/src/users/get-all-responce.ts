import { GlobalResponseObject } from "packages/libs/shared-models/src/common";
import { GetAllUsersDto } from "./get-all-users.dto";

export class GetAllUserResponse extends GlobalResponseObject {


    data?: GetAllUsersDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllUsersDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}
