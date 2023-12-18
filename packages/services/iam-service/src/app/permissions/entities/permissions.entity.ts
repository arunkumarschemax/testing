import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { UserPermissions } from "../../user_permissions/entities/user_permissions.entity";

@Entity('permissons')

export class PermissionsEntity extends AbstractEntity{
    @Column('varchar',{name:'name',length:255})
    name:string;

    @Column('varchar',{name:'scope_id',length:11})
    scope_id: number;


    // @OneToMany(()=> UserPermissions,(up)=>up.permissions)
    // permissions_id: UserPermissions;
   
}