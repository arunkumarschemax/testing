import { Body, Controller, Post } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationIdReqDto, CommonResponse, GetAllModulesDropDownResponse, GetAllModulesResponse } from '@finestchoicex-iam/shared-models';
import { ModuleDto } from './dto/module.dto';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { ModuleIdReqDto } from './dto/module-id-req-dto';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(
    private readonly moduleService: ModulesService
  ) {

  }
  @Post('createModules')
  async create(@Body() createDto: ModuleDto): Promise<CommonResponse> {
    try {
      return await this.moduleService.create(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }

  };

  @Post('getAllModules')
  async getAllApplications(): Promise<GetAllModulesResponse> {
    try {
      return await this.moduleService.getAllModules()
    } catch (error) {
      return returnException(GetAllModulesResponse, error);
    }
  };

  @Post('getAllModulesByAppId')
  async getAllModulesByAppId(@Body() req: ApplicationIdReqDto): Promise<GetAllModulesResponse> {
    try {
      return await this.moduleService.getAllModulesByAppId(req);
    } catch (error) {
      return returnException(GetAllModulesResponse, error);
    }
  };

  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: ModuleIdReqDto): Promise<CommonResponse> {
    try {
      return await this.moduleService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

  @Post('getAllModulesDropDown')
  async getAllModulesDropDown(): Promise<GetAllModulesDropDownResponse> {
    try {
      return await this.moduleService.getAllModulesDropDown()
    } catch (error) {
      return returnException(GetAllModulesDropDownResponse, error);
    }
  }


  @Post('getAllModulesDropDownByAppId')
  async getAllModulesDropDownByAppId(@Body() req: ApplicationIdReqDto): Promise<GetAllModulesDropDownResponse> {
    try {
      return await this.moduleService.getAllModulesDropDownByAppId(req);
    } catch (error) {
      return returnException(GetAllModulesDropDownResponse, error);
    }
  }


}
