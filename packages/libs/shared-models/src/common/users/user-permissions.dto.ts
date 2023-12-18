import { MenusData } from "./menusData.dto";

export class UserPermissionsDto {
    userId: number;
    userName: string;
    roleId: string[];
    roleName: string[];
    menusData: MenusData[];
    externalRefNo: string;
    /**
     * 
     * @param userId 
     * @param userName 
     * @param roleId 
     * @param roleName 
     * @param menusData 
     * @param externalRefNo 
     */
    constructor(userId: number, userName: string, roleId: string[], roleName: string[], menusData: MenusData[], externalRefNo: string) {
        this.userId = userId;
        this.userName = userName;
        this.roleId = roleId;
        this.roleName = roleName;
        this.menusData = menusData;
        this.externalRefNo = externalRefNo;
    }
}