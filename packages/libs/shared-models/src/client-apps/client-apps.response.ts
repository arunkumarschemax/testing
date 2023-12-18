import { GlobalResponseObject } from "../common";
import { ClientAppsDto } from "./client-apps.dto";



export class ClientAppsResponse extends GlobalResponseObject {
    data?: ClientAppsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: ClientAppsDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}