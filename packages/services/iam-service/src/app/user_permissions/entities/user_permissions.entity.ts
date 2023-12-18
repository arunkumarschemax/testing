import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('user_permissions')

export class UserPermissions extends AbstractEntity {


    // @ManyToOne(()=> Permissions,(pm)=>pm.permissions_id)
    // @JoinColumn({name:'permissions_id'})
    // permissions: Permissions

}