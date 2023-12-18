import { GenderEnum } from "../common";

export class GetAllUsersDto {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: GenderEnum;
    mobileNo: string;
    versionFlag: number;
    isActive: boolean;
    userId: number;
    externalRefNo: string;
    identityNo: string;
    identityType: string;
    constructor(firstName: string,
        middleName: string,
        lastName: string,
        gender: GenderEnum,
        mobileNo: string,
        versionFlag: number,
        isActive: boolean,
        userId: number,
        externalRefNo: string,
        identityNo: string,
        identityType: string,
        ) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.gender = gender;
        this.mobileNo = mobileNo;
        this.userId = userId;
        this.isActive = isActive;
        this.externalRefNo = externalRefNo;
        this.versionFlag = versionFlag;
        this.identityNo = identityNo;
        this.identityType = identityType;
    }
}