import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { UserRoles } from "../../user_roles/entitys/user-roles.entity";

@Entity('roles')
export class Roles extends AbstractEntity {

    @Column('varchar', {
        name: 'name',
        length: 255
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        length: 225
    })
    Description: string;

    // @ManyToOne(() => Units, (units) => units.unitsId)
    // @JoinColumn({ name: "unit_id" })
    // rolesId:  Units;


    // @OneToMany(() => User
    // Roles, (usr) => usr.userRolls)
    // rolesId: UserRoles

}