import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('role_permissions')

export class RolePermission extends AbstractEntity{
 

    // @ManyToOne(() => Permissions, permission => permission.role_permission)
    // permission: Permissions;
  
    // @ManyToOne(() => Role, role => role.rolePermission)
    // role: Role;
}