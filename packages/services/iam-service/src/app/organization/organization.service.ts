import { Injectable } from '@nestjs/common';
import { OrganizationDto } from './dtos/organization.dto';
import { GenericTransactionManager } from '../../database/typeorm-transactions';
import { Organization } from './entities/organization.entity';
import { OrganizationRepo } from './repo/organization.repo';
import { CommonResponse, DropdownOrganizationDto, DropdownOrganizationResponse, GetAllOrganizationResponse, GetAllOrganizations } from '@finestchoicex-iam/backend-utils';
import { DataSource } from 'typeorm';
import { OrganizationAdapter } from './repo/adapter';
import { ActivateOrganizationDto } from './dtos/activate.dto';

@Injectable()
export class OrganizationService {
  constructor(
    private dataSource: DataSource,
    private readonly orgRepo: OrganizationRepo,
    private readonly adapter: OrganizationAdapter,
  ) { }

  async createOrganization(createDto: OrganizationDto): Promise<CommonResponse> {
    const convert = this.adapter.convertDtotoEntity(createDto);
    const save = await this.orgRepo.save(convert)
    return new CommonResponse(true, 1234, 'Organization created successfully')
  }
  async getAllOrganizations(): Promise<GetAllOrganizationResponse> {
    const getAll = await this.orgRepo.find();
    const data: GetAllOrganizations[] = [];
    for (const submit of getAll) {
      const get = this.adapter.convertEntitytoDdto(submit);
      data.push(get);
    }
    return new GetAllOrganizationResponse(true, 1233, 'Data retrieved successfully', data)
  }
  async getAllOrganizationsDropdown(): Promise<DropdownOrganizationResponse> {
    const dropdown = await this.orgRepo.find({ select: ['name', 'uuid'] });
    const data: DropdownOrganizationDto[] = [];
    for (const getDropdown of dropdown) {
      const get = this.adapter.convertDropDownEntityToDto(getDropdown)
      data.push(get);
    }
    return new DropdownOrganizationResponse(true, 3334, 'Dataretrived successfully', data);

  }
  async activateOrDeactivateOrganization(dto: ActivateOrganizationDto): Promise<CommonResponse> {
    const deactivate = await this.orgRepo.findOne({ where: { uuid: dto.id } })
    const activate = await this.orgRepo.update({ uuid: dto.id }, { isActive: !deactivate.isActive })
    return new CommonResponse(true, 1233, `Status ${deactivate.isActive ? 'Deactivated' : 'Activated'} successfully`)
  }
}
