import { GlobalResponseObject } from "../common";
import { GetAllApplicationsDto } from "./application.dto";

export class ApplicationsResponse extends GlobalResponseObject {
    data?: GetAllApplicationsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllApplicationsDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}