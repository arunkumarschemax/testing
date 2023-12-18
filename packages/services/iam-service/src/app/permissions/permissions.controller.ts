import { Body, Controller, Post } from '@nestjs/common';
import { PermsService } from './permissions.service';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { ActivatePermDto } from './dto/active-deactive.dto';
import { AppModuleSubMenuIdReqDto, CommonResponse, DropdownPermissionResponse, GetAllPermissionResponse, PermissionsDto } from '@finestchoicex-iam/shared-models';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Permissions')
@Controller('permissions')
export class PermsController {
  constructor(private readonly permsService: PermsService) { }

  @Post('createPerm')
  async createPerm(@Body() permDto: PermissionsDto): Promise<CommonResponse> {
    try {
      return await this.permsService.createPerm(permDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getAllPerms')
  async getAllPerms(): Promise<GetAllPermissionResponse> {
    try {
      return await this.permsService.getAllPerms();
    } catch (error) {
      return returnException(GetAllPermissionResponse, error);
    }
  }

  @Post('getAllPermsBySubMenuModuleAndAppId')
  async getAllPermsBySubMenuModuleAndAppId(@Body() req: AppModuleSubMenuIdReqDto): Promise<GetAllPermissionResponse> {
    try {
      return await this.permsService.getAllPermsBySubMenuModuleAndAppId(req);
    } catch (error) {
      return returnException(GetAllPermissionResponse, error);
    }
  }

  @Post('activateOrDeactivatePermission')
  async activateOrDeactivatePermission(@Body() activateDto: ActivatePermDto): Promise<CommonResponse> {
    try {
      return await this.permsService.activateOrDeactivatePermission(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
