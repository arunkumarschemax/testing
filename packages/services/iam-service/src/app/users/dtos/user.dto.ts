import { GenderEnum, IdentityTypeEnum } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";

export class UsersDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    middleName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    mobileNo: string;

    @ApiProperty()
    unitId: number

    @ApiProperty()
    externalRefNo: string

    @ApiProperty()
    gender: GenderEnum;

    @ApiProperty()
    identityType: IdentityTypeEnum;

    @ApiProperty()
    identityNo: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    salt: string;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    filesData: any[];

    @ApiProperty()
    userId: number;

    @ApiProperty()
    authenticationId: number;

    @ApiProperty()
    versionFlag: number;

}