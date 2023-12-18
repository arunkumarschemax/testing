import { GlobalResponseObject } from "../../../shared-models/src/common";
import { GetAllAttributeDto } from "./attribute.dto";

export class GetAllAttributesResponce extends GlobalResponseObject {
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