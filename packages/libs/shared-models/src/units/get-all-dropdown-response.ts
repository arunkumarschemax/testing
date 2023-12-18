import { GlobalResponseObject } from "../../../shared-models/src/common";
import { GetAllUnitDropDownDto } from "./units.dto.dropdown";

export class GetAllUnitsDropDownResponse extends GlobalResponseObject {
    data?: GetAllUnitDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: GetAllUnitDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}