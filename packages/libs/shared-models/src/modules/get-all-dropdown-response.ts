import { GlobalResponseObject } from "../common"; 
import { ModulesDropDownDto } from "./modules-drop-down-dto";


export class GetAllModulesDropDownResponse extends GlobalResponseObject {
    data?: ModulesDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: ModulesDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}