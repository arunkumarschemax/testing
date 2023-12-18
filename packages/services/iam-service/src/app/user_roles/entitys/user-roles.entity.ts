import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { Roles } from "../../roles/entities/roles.entity";

@Entity('user_roles')
export class UserRoles extends AbstractEntity {

    // @ManyToOne(() => Users, (u) => u.usersId)
    // @JoinColumn({ name:"user_id" })
    // usersId: Users;

    // @ManyToOne(() => Roles, (rolls) => rolls.rolesId)
    // @JoinColumn({ name:"role_id" })
    // userRolls: Roles;
    
    

    }

    