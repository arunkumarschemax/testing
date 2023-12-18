import { returnException } from '@finestchoicex-iam/backend-utils';
import { ApplicationIdReqDto, ClientAppsDto, ClientAppsResponse, CommonResponse, OrganizationReqDto } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivateUserRolesDto } from './dtos/activate.dto';
import { ClientAppsService } from './client-apps.service';

@ApiTags('Client Apps')
@Controller('client-apps')
export class ClientAppsController {
  constructor(
    private readonly clientAppsService: ClientAppsService
  ) {

  }
  @Post('mapOrUnMapAppsToClient')
  async mapOrUnMapAppsToClient(@Body() createDto: ClientAppsDto): Promise<CommonResponse> {
    try {
      return await this.clientAppsService.mapOrUnMapAppsToClient(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

  @Post('getAllAppsByApplicationId')
  async getAllAppsByApplicationId(@Body() req: ApplicationIdReqDto): Promise<ClientAppsResponse> {
    try {
      return await this.clientAppsService.getAllAppsByApplicationId(req);
    } catch (error) {
      return returnException(ClientAppsResponse, error);
    }
  };


  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: ActivateUserRolesDto): Promise<CommonResponse> {
    try {
      return await this.clientAppsService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

}
