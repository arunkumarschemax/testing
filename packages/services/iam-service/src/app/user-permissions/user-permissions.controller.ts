import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { UserPermDto } from './dto/user-permission.dto';
import { UserPermissionsService } from './user-permissions.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User Permissions')
@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private readonly userPermsService: UserPermissionsService) { }

  @Post('createUserPerm')
  async createUserPerm(@Body() userPermDto: UserPermDto): Promise<CommonResponse> {
    try {
      return await this.userPermsService.createUserPerm(userPermDto);

    } catch (error) {
      throw returnException(CommonResponse, error);
    }
  }

  @Post('getAllUserPerms')
  async getAllUserPerms(): Promise<CommonResponse> {
    try {
      return await this.userPermsService.getAllUserPerms();
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getAllUserPermsDropDown')
  async getAllUserPermsDropDown(): Promise<CommonResponse> {
    try {
      return await this.userPermsService.getAllUserPermsDropDown();
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('activateOrDeactivateUserPerms')
  async activateOrDeactivateUserPerm(activateDto: any): Promise<CommonResponse> {
    try {
      return await this.userPermsService.activateOrDeactivateUserPerm(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
