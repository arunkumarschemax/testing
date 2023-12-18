import { returnException } from '@finestchoicex-iam/backend-utils';
import { ApplicationsDropDownResponse, CommonResponse, ApplicationsResponse, ApplicationIdReqDto } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { ApplicationsDto } from './dto/applications.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService
  ) {

  }
  @Post('createApplication')
  async create(@Body() createDto: ApplicationsDto): Promise<CommonResponse> {
    try {
      return await this.applicationsService.create(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }

  };

  @Post('getAllApplications')
  async getAllApplications(): Promise<ApplicationsResponse> {
    try {
      return await this.applicationsService.getAllApplications()
    } catch (error) {
      return returnException(ApplicationsResponse, error);
    }

  };


  // @Post('getApplicationsById')
  // async getApplicationById(@Body() id: string): Promise<any> {
  //   try {
  //     return await this.applicationsService.getApplicationsById(id)
  //   } catch (error) {
  //     return returnException(CommonResponse, error);
  //   }
  // }

  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: ApplicationIdReqDto): Promise<CommonResponse> {
    try {
      return await this.applicationsService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

  @Post('getAllApplicationsDropDown')
  async getAllApplicationsDropDown(): Promise<ApplicationsDropDownResponse> {
    try {
      return await this.applicationsService.getAllApplicationsDropDown()
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
