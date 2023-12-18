import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { UserEntity } from "../../users/entities/users.entity";

@Entity('authentications')
export class AuthenticationEntity extends AbstractEntity {
    @Column('varchar', {
        name: 'email',
        length: 150
    })
    email: string;

    @Column('varchar', {
        name: 'username',
        length: 150
    })
    userName: string;

    @Column('varchar', {
        name: 'password',
        length: 150
    })
    password: string;

    @Column('boolean', { name: 'is_email_verified' })
    isEmailVerified: boolean;

    @Column('int', { name: 'no_of_failed_login' })
    noOfFailedLogin: number;

    @Column('datetime', {
        name: 'account_locked_on'
    })
    accountLockedOn: string;

    @Column('varchar', { name: 'sent_otp', length: 255 })
    sentOtp: string;

    @Column('datetime', { name: 'otp_sent_time' })
    otpSentTime: string;

    @Column('datetime', { name: 'otp_expiry_time' })
    otpExpiryTime: string;

    @Column('varchar', { name: 'salt' })
    salt: string;

    @Column('varchar', { name: 'hashed_refresh_token' })
    hashedRefreshToken: string;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.authentication)
    @Exclude()
    public user: UserEntity;
}