import { GlobalResponseObject } from "../../../shared-models/src/common";
import { SubMenuDto } from "./sub-menu.dto";

export class GetAllSubMenusResponse extends GlobalResponseObject {
    data?: SubMenuDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: SubMenuDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}