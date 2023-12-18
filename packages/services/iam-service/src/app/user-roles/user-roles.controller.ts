import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse, UserPermissionsResponse, UserRoleDto, UserRolesResponse, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ActivateUserRolesDto } from './dtos/activate.dto';
import { UserRolesDto } from './dtos/userroles.dto';
import { UserRolesService } from './user-roles.service';

@ApiTags('User Roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(
    private readonly userRolesService: UserRolesService
  ) {

  }
  @Post('mapOrUnMapRolesToUser')
  async mapOrUnMapRolesToUser(@Body() createDto: UserRoleDto): Promise<CommonResponse> {
    try {
      return await this.userRolesService.mapOrUnMapRolesToUser(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

  @Post('getAllRolesByUserId')
  async getAllRolesByUserId(@Body() req: UsersIdDto): Promise<UserRolesResponse> {
    try {
      return await this.userRolesService.getAllRolesByUserId(req);
    } catch (error) {
      return returnException(UserRolesResponse, error);
    }
  };


  @Post('getAllPermissionsByUserId')
  async getAllPermissionsByUserId(@Body() req: UsersIdDto): Promise<UserPermissionsResponse> {
    try {
      console.log(req)
      return await this.userRolesService.getAllPermissionsByUserId(req);
    } catch (error) {
      console.log(error)
      return returnException(UserPermissionsResponse, error);
    }
  }


  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: ActivateUserRolesDto): Promise<CommonResponse> {
    try {
      return await this.userRolesService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

}
