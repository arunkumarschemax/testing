import { GenderEnum, IdentityTypeEnum } from "@finestchoicex-iam/shared-models";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { AuthenticationEntity } from "../../authentications/entities/authentications.entity";
import { UnitEntity } from "../../units/entities/units.entity";
import { UserPermissionEntity } from "../../user-permissions/entities/user-permissions.entity";
import { UserRolesEntity } from "../../user-roles/entitys/user-roles.entity";
import { UserToAttributes } from "../../user-to-attributes/entities/user-to-attributes.entity";
import { Client } from "../../organization/entities/organization.entity";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @Column('varchar', { name: 'first_name', length: 40 })
    firstName: string;

    @Column('varchar', { name: 'middle_name', length: 40, nullable: true })
    middleName: string;

    @Column('varchar', { name: 'last_name', length: 40 })
    lastName: string;

    @Column('varchar', { name: 'mobile_no', length: 20 })
    mobileNo: string;


    @Column('enum', {
        name: 'gender',
        enum: GenderEnum,
    })
    gender: GenderEnum;


    @Column('enum', {
        name: 'identity_type',
        enum: IdentityTypeEnum,
    })
    identityType: IdentityTypeEnum;


    @Column('varchar', { name: 'identity_no', length: 20 })
    identityNo: string;


    @Column('varchar', { name: 'external_ref_no', length: 40, nullable: true })
    externalRefNo: string;

    @OneToOne(() => AuthenticationEntity, (authentication: AuthenticationEntity) => authentication.user, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'authentication_id' })
    authentication: AuthenticationEntity;


    @ManyToOne(() => UnitEntity, (unit: UnitEntity) => unit.users)
    @JoinColumn({ name: 'unit_id' })
    unit: UnitEntity;

    @ManyToOne(() => Client, (client) => client.user)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @OneToMany(() => UserRolesEntity, (userRoles) => userRoles.user)
    userRoles: UserRolesEntity[];

    @OneToMany(() => UserToAttributes, (userRoles) => userRoles.user)
    userAttributes: UserToAttributes[];

    @OneToMany(() => UserPermissionEntity, (rolePerm) => rolePerm.user)
    userPermissions: UserPermissionEntity[];

}