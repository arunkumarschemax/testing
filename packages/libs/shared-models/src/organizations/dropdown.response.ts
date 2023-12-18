import { GlobalResponseObject } from "../../../shared-models/src/common";
import { DropdownOrganizationDto } from "./dropdown.dto";

export class DropdownOrganizationResponse extends GlobalResponseObject {
    data?: DropdownOrganizationDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?:  DropdownOrganizationDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}