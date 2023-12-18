import { GlobalResponseObject } from "../../../shared-models/src/common";
import { GetAllOrganizations } from "./organization.getall.dto";

export class GetAllOrganizationResponse extends GlobalResponseObject {
    data?: GetAllOrganizations[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?:  GetAllOrganizations[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}