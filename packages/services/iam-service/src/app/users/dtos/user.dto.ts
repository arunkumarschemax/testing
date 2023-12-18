import { ApiProperty } from "@nestjs/swagger";

export class UsersDto{
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    middleName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    mobileNumber: string;
    @ApiProperty()
    authenticationId: number;
    @ApiProperty()
    unitId: number;
}