import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { RolesEntity } from "../../roles/entities/roles.entity";
import { UserEntity } from "../../users/entities/users.entity";

@Entity('user_roles')
export class UserRolesEntity extends AbstractEntity {

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.userRoles, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(() => RolesEntity, (user: RolesEntity) => user.userRoles, { nullable: false })
    @JoinColumn({ name: "role_id" })
    role: RolesEntity;

}

