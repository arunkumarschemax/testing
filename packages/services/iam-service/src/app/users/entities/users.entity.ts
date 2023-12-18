import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { AuthenticationEntity } from "../../authentications/entities/authentications.entity";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @Column('varchar', { name: 'first_name', length: 40 })
    firstName: string;

    @Column('varchar', { name: 'middle_name', length: 40 })
    middleName: string;

    @Column('varchar', { name: 'last_name', length: 40 })
    lastName: string;

    @Column('varchar', { name: 'mobile_no', length: 20 })
    mobileNumber: string;

    @Column('int', { name: 'authentication_id' })
    authenticationId: number;

    @Column('int', { name: 'unit_id' })
    unitId: number;

    @OneToOne(() => AuthenticationEntity, (authentication: AuthenticationEntity) => authentication.user, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'authentication_id' })
    public authentication: AuthenticationEntity;
}