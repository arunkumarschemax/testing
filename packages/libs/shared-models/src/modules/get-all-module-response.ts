import { GlobalResponseObject } from "../common";
import { ModuleDto } from "./module.dto";

export class GetAllModulesResponse extends GlobalResponseObject {
    data?: ModuleDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: ModuleDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}