import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";
import { RolesEntity } from "../../roles/entities/roles.entity";

@Entity('role_permissions')
export class RolePermissionEntity extends AbstractEntity {


    @ManyToOne(() => PermissionsEntity, (pr) => pr.rolePermissions, { nullable: false })
    @JoinColumn({ name: "permission_id" })
    permission: PermissionsEntity;


    @ManyToOne(() => RolesEntity, (pr) => pr.rolePermissions, { nullable: false })
    @JoinColumn({ name: "role_id" })
    role: RolesEntity;
}