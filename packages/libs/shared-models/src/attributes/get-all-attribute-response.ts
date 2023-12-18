import { GlobalResponseObject } from "../common";
import { GetAllAttributeDto } from "./attribute.dto";

export class GetAllAttributesResponse extends GlobalResponseObject {
    data?: GetAllAttributeDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllAttributeDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}