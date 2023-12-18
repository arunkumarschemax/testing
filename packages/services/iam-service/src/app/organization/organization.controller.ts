import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dtos/organization.dto';
import { ApiTags } from '@nestjs/swagger';
import { returnException, CommonResponse, GetAllOrganizationResponse, DropdownOrganizationResponse } from '@finestchoicex-iam/backend-utils';
import { ActivateOrganizationDto } from './dtos/activate.dto';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('createOrganization')
  async createOrganization(@Body() createDto: OrganizationDto): Promise<CommonResponse> {
    try {
      return await this.organizationService.createOrganization(createDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


  @Post('getAllOrganizations')
  async getAllOrganizations(): Promise<GetAllOrganizationResponse> {
    try {
      return await this.organizationService.getAllOrganizations()
    } catch (error) {
      return returnException(GetAllOrganizationResponse, error)
    }
  }
  @Post('getAllOrganizationsDropdown')
  async getAllOrganizationsDropdown(): Promise<DropdownOrganizationResponse> {
    try {
      return await this.organizationService.getAllOrganizationsDropdown();
    } catch (error) {
      return returnException(DropdownOrganizationResponse, error)
    }
  }
  @Post('activateOrDeactivateOrganization')
  async activateOrDeactivateOrganization(@Body() dto:ActivateOrganizationDto): Promise<CommonResponse> {
    try {
      return await this.organizationService.activateOrDeactivateOrganization(dto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }
}
