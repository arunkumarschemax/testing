import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserRolesEntity } from "../entitys/user-roles.entity";
import { RolesEntity } from "../../roles/entities/roles.entity";
import { UserEntity } from "../../users/entities/users.entity";
import { AllUserPermissionsResponseDto, UserRolesDto } from "@finestchoicex-iam/shared-models";
import { RolePermissionEntity } from "../../role-permissions/entities/role-permissions.entity";
import { SubMenuEntity } from "../../sub-menus/entities/sub-menus.entity";
import { ScopesEntity } from "../../scopes/entites/scopes.entity";
import { MenusEntity } from "../../menus/entities/menus.entity";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";
import { UserPermissionEntity } from "../../user-permissions/entities/user-permissions.entity";
import { ApplicationEntity } from "../../applications/entities/application.entity";


@Injectable()
export class UserRolesRepository extends Repository<UserRolesEntity>{
    constructor(private dataSource: DataSource) {
        super(UserRolesEntity, dataSource.createEntityManager());
    }

    async getUserRolesByUserId(userId: number) {
        const queryData = await this.createQueryBuilder("ur")
            .select(`ur.user_id, u.first_name, GROUP_CONCAT(ur.role_id) as role_id, GROUP_CONCAT(r.name) as role_name`)
            .leftJoin(RolesEntity, 'r', 'r.id = ur.role_id')
            .leftJoin(UserEntity, 'u', 'u.id = ur.user_id')
            .where(`ur.user_id = '${userId}'`)
            .getRawMany()
        const data = queryData.map((rec => {
            return new UserRolesDto(rec.user_id, rec.first_name, rec.role_id, rec.role_name)
        }))
        return data
    }

    async getAllPermissionsByUserId(userId: number) {
        const queryData = await this.createQueryBuilder("ur")
            .select(`u.id as user_id, u.first_name,u.external_ref_no, pr.role_id,r.name as role_name, pr.permission_id, sm.id as sub_menu_id, sm.name as sub_menu_name,sm.icon_type as sub_menu_icon_type, sm.icon_name as sub_menu_icon_name,sm.path, sm.component, sm.menu_id as base_sub_menu_id, m.id as menu_id, m.name as menu_name, m.icon_type as menu_icon_type, m.icon_name as menu_icon_name, s.id as scope_id, s.name as scope_name,sm.order as sm_order,m.order as m_order`)
            .leftJoin(RolePermissionEntity, 'pr', 'pr.role_id = ur.role_id')
            .leftJoin(RolesEntity, 'r', 'r.id = ur.role_id')
            .leftJoin(PermissionsEntity, 'p', 'p.id = pr.permission_id')
            .leftJoin(SubMenuEntity, 'sm', 'sm.id = p.sub_menu_id')
            .leftJoin(MenusEntity, 'm', 'm.id = sm.menu_id')
            .leftJoin(ScopesEntity, 's', 's.id = p.scope_id')
            .leftJoin(ApplicationEntity, 'app', 'app.id = p.application_id')
            .leftJoin(UserEntity, 'u', 'u.id = ur.user_id')
            .leftJoin(UserPermissionEntity, 'up', 'u.id = up.user_id')
            .where(`ur.user_id = '${userId}'`)
            .orderBy(`m.order,sm.order`)
            .groupBy(`pr.permission_id`)
            .getRawMany()
        const data = queryData.map((rec => {
            return new AllUserPermissionsResponseDto(rec.user_id, rec.first_name, rec.role_id, rec.role_name, rec.permission_id, rec.sub_menu_id, rec.sub_menu_name, rec.sub_menu_icon_type, rec.sub_menu_icon_name, rec.path, rec.component, rec.scope_id, rec.scope_name, rec.menu_id, rec.menu_name, rec.menu_icon_type, rec.menu_icon_name, rec.sm_order, rec.m_order, rec.base_sub_menu_id)
        }))
        console.log(data.length)
        return data
    }
}