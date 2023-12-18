import { ActionsEnum, CommonResponse, MenusData, SubMenuData, UserPermissionsDto, UserPermissionsResponse, UserRoleDto, UserRolesResponse, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { Injectable } from '@nestjs/common';
import { UserRolesAdapter } from './adapters/userroles.adapter';
import { ActivateUserRolesDto } from './dtos/activate.dto';
import { UserRolesRepository } from './repositories/user-roles.repo';
import { UserRolesDto } from './dtos/userroles.dto';
import { UserEntity } from '../users/entities/users.entity';


@Injectable()
export class UserRolesService {
  constructor(
    private userRolesDataRepo: UserRolesRepository,
    private userRolesAdapter: UserRolesAdapter
  ) {

  }


  async mapOrUnMapRolesToUser(createDto: UserRoleDto): Promise<CommonResponse> {
    if (createDto.actionType == ActionsEnum.DELETE)
      return this.deleteUserRoleMapping(createDto)
    const conversion = this.userRolesAdapter.convertDtoToEntity(createDto);
    const saving = await this.userRolesDataRepo.save(conversion)
    return new CommonResponse(true, 1234, 'created successfully', saving)
  };

  async deleteUserRoleMapping(createDto: UserRoleDto) {
    await this.userRolesDataRepo.delete({ id: createDto.userRoleId })
    return new CommonResponse(true, 1234, 'User to Roles are un-mapped successfully')
  }

  async getAllRolesByUserId(req: UsersIdDto): Promise<UserRolesResponse> {
    const user: UserEntity = new UserEntity();
    user.id = req.usersId;
    const getAll = await this.userRolesDataRepo.find({ where: { user }, relations: ['role', 'user'] });
    const getData: UserRoleDto[] = [];
    for (const app of getAll) {
      const data = this.userRolesAdapter.convertEntitytoDto(app);
      getData.push(data);
    }
    return new UserRolesResponse(true, 1234, "Data retrieved succesfully", getData)
  };

  async getAllPermissionsByUserId(req: UsersIdDto): Promise<UserPermissionsResponse> {
    const records = await this.userRolesDataRepo.getAllPermissionsByUserId(req.userId);
    console.log(records)
    if (records.length == 0) {
      return new UserPermissionsResponse(false, 33333, "Records Not Found")
    }
    const userInfoMap = new Map<string, MenusData>();
    const subMenuMap = new Map<string, Map<string, SubMenuData>>();
    const roleIds = new Set('');
    const roleNames = new Set('');
    for (const record of records) {
      const menuId = record.menuId;
      const subMenuId = record.subMenuId;
      roleIds.add(record.roleId);
      roleNames.add(record.roleName);
      if (!userInfoMap.has(menuId)) {
        userInfoMap.set(menuId, new MenusData(record.menuName,record.menuId, record.menuName, record.menuIconType, record.menuIconName, [], record.mOrder))
      }
      if (!subMenuMap.has(menuId)) {
        const firstSubMenuMap = new Map();
        firstSubMenuMap.set(subMenuId, new SubMenuData(record.subMenuName,record.subMenuId, record.subMenuName, record.subMenuIconType, record.subMenuIconName, record.path, record.component, [record.scope], record.smOrder, record.baseSubMenuId));
        subMenuMap.set(menuId, firstSubMenuMap);
      } else {
        if (!subMenuMap.get(menuId).has(subMenuId)) {
          subMenuMap.get(menuId).set(subMenuId, new SubMenuData(record.subMenuName,record.subMenuId, record.subMenuName, record.subMenuIconType, record.subMenuIconName, record.path, record.component, [record.scope], record.smOrder, record.baseSubMenuId));
        } else {
          const scopes = new Set(subMenuMap.get(menuId).get(subMenuId).scopes);
          scopes.add(record.scope);
          subMenuMap.get(menuId).get(subMenuId).scopes = Array.from(scopes);
        }
      }
    }
    for (const [menu, MenuObj] of userInfoMap.entries()) {
      userInfoMap.get(menu).subMenuData.push(...Array.from(subMenuMap.get(menu).values()).sort((a, b) => a.orderId - b.orderId));
    }
    const userRolesArray: MenusData[] = [];
    userInfoMap.forEach(menusData => userRolesArray.push(menusData));
    const userData = new UserPermissionsDto(records[0].userId, records[0].userName, Array.from(roleIds), Array.from(roleNames), userRolesArray, '');
    return new UserPermissionsResponse(true, 53, 'Retrieved SuccessFully', userData);
  }



  async activateOrDeactivate(deactivateDto: ActivateUserRolesDto): Promise<CommonResponse> {
    const deactivate = await this.userRolesDataRepo.findOne({ where: { uuid: deactivateDto.id } })
    const activate = await this.userRolesDataRepo.update({ uuid: deactivateDto.id }, { isActive: !deactivate.isActive })
    return new CommonResponse(true, 1234, `Status ${deactivate.isActive ? 'deactivated' : 'activated'} successfully`);
  };


}
