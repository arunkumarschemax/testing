import { Body, Controller, Post } from '@nestjs/common';
import { RolePermDto } from './dto/role_permissions.dto';
import { CommonResponse, GetAllRolePermissionDropDownDto, GetAllRolePermissionsDropDownResponse, GetAllRolePermissionsResponse, RolesIdReqDto } from '@finestchoicex-iam/shared-models';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { RolePermissionsService } from './role-permissions.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Role Permissions')
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermsService: RolePermissionsService) { }

  @Post('mapOrUnMapRolePermissions')
  async mapOrUnMapRolePermissions(@Body() rolePermDto: RolePermDto): Promise<CommonResponse> {
    try {
      return await this.rolePermsService.createRolePerm(rolePermDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getAllRolePerms')
  async getAllRolePerms(): Promise<GetAllRolePermissionsResponse> {
    try {
      return await this.rolePermsService.getAllRolePerms();
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


  @Post('activateOrDeactivateRolePerms')
  async activateOrDeactivateRolePerm(@Body() activateDto: any): Promise<CommonResponse> {
    try {
      return await this.rolePermsService.activateOrDeactivateRolePerm(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getRolePermissionByRoleId')
  async getRolePermissionByRoleId(@Body() req: RolesIdReqDto): Promise<GetAllRolePermissionsDropDownResponse> {
    try {
      return await this.rolePermsService.getRolePermissionByRoleId(req);
    } catch(error) {
      return returnException(GetAllRolePermissionsDropDownResponse, error)
    }
  }


}
