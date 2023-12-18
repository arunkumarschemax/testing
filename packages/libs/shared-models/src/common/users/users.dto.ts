import { GenderEnum, IdentityTypeEnum } from "../enums";
import { UsersFileUploadDataDto } from "./users-files-data.dto";

export class UsersCreateDto {
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNo: string;
    unitId: number;
    clientId: number;
    gender: GenderEnum;
    identityType: IdentityTypeEnum;
    identityNo: string;
    externalRefNo: string;
    userName: string;
    email: string;
    password: string;
    salt: string;
    createdUser: string;
    filesData: any[];
    userId: number;
    authenticationId: number;
    versionFlag: number; 
    /**
     * 
     * @param firstName 
     * @param middleName 
     * @param lastName 
     * @param mobileNo 
     * @param unitId 
     * @param gender 
     * @param identityType 
     * @param identityNo 
     * @param userName 
     * @param email 
     * @param password 
     * @param salt 
     * @param createdUser 
     * @param filesData 
     * @param userId 
     * @param authenticationId 
     * @param versionFlag 
     */

    constructor(
        firstName: string,
        middleName: string,
        lastName: string,
        mobileNo: string,
        unitId: number,
        clientId: number,
        gender: GenderEnum,
        identityType: IdentityTypeEnum,
        identityNo: string,
        externalRefNo: string,
        userName: string,
        email: string,
        password: string,
        salt: string,
        createdUser: string,
        filesData: any[],
        userId: number,
        authenticationId: number,
        versionFlag: number,
    ) {

        this.email = email;
        this.password = password;
        this.salt = salt;
        this.createdUser = createdUser;
        this.filesData = filesData;
        this.userName = userName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.mobileNo = mobileNo;
        this.clientId = clientId;
        this.unitId = unitId;
        this.gender = gender;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.externalRefNo = externalRefNo;
        this.userId = userId;
        this.authenticationId = authenticationId;
        this.versionFlag = versionFlag;
    }

}