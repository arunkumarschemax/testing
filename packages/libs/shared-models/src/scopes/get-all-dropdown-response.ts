import { GlobalResponseObject } from "../../../shared-models/src/common"; 
import { ScopesDropDownDto } from "./scope.dto.dropdown";

export class GetAllScopesDropDownResponse extends GlobalResponseObject {
    data?: ScopesDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: ScopesDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}