import { GlobalResponseObject } from "../common"; 
import {  ApplicationsDropDownDto } from "./application-dropdown.dto";


export class ApplicationsDropDownResponse extends GlobalResponseObject {
    data?: ApplicationsDropDownDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: ApplicationsDropDownDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data;
    }

}