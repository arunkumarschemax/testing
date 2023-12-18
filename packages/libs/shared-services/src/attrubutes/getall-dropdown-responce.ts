import { GlobalResponseObject } from "../../../shared-models/src/common"; 
import { GetAllAttributeDropDown } from "./get-attribute-dropdown";

export class GetAllAttributesDropDownResponse extends GlobalResponseObject {
    data?: GetAllAttributeDropDown[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllAttributeDropDown[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}