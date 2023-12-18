import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";
import { UserEntity } from "../../users/entities/users.entity";

@Entity('user_permissions')
export class UserPermissionEntity extends AbstractEntity {

    @ManyToOne(() => PermissionsEntity, (pr) => pr.userPermissions, { nullable: false })
    @JoinColumn({ name: "permission_id" })
    permission: PermissionsEntity;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.userPermissions, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

}