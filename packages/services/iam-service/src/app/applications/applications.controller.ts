import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CommonResponse, returnException } from '@finestchoicex-iam/backend-utils'
import { ApplicationsDto } from './dto/applications.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService
  ) {

  }
  @Post('create')
  async create(@Body() createDto: ApplicationsDto): Promise<any> {
    try {
      return await this.applicationsService.create(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }

  }

  @Post('getAllApplications')
  async getAllApplications(): Promise<any> {
    try {
      return await this.applicationsService.getAllApplications()
    } catch (error) {
      return returnException(CommonResponse, error);
    }

  }
  @Post('getApplicationsById')
  async getApplicationById(@Body() id: string): Promise<any> {
    try {
      return await this.applicationsService.getApplicationsById(id)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: any): Promise<any> {
    try {
      return await this.applicationsService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getApplicationsAllDropDown')
  async getApplicationsAllDropDown(): Promise<any> {
    try {
      return await this.applicationsService.getApplicationsAllDropDown()
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
