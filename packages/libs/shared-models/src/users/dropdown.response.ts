import { GlobalResponseObject } from "packages/libs/shared-models/src/common";
import { DropdownUsersDto } from "./get-dropdown-dto";




export class GetAllUsersDropDown extends GlobalResponseObject {


    data?: DropdownUsersDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DropdownUsersDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}