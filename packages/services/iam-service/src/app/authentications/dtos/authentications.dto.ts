import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationsDto{
    @ApiProperty()
    email:string;
    @ApiProperty()
    username:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    sEmailVerified:boolean;
    @ApiProperty()
    noOfFailedLogin:number;
    @ApiProperty()
    accountLockedOn:string;
    @ApiProperty()
    sentOtp:string;
    @ApiProperty()
    otpSentTime:string;
    @ApiProperty()
    otpExpiryTime:string;
    @ApiProperty()
    salt:string;
    @ApiProperty()
    hashedRefreshToken:string;
    @ApiProperty()
    authenticationId:string;
}
