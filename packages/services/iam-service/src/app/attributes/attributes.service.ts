import { CommonResponse, GetAllAttributeDto, GetAllAttributesDropDownResponse, GetAllAttributesResponce } from '@finestchoicex-iam/backend-utils';
import { Injectable } from '@nestjs/common';
import { GetAllAttributeDropDown } from 'packages/libs/shared-services/src/attrubutes/get-attribute-dropdown';
import { DataSource } from 'typeorm';
import { AttributesAdapter } from './adapter';
import { ActivateAttributeDto } from './dtos/activate.dto';
import { AttributeDto } from './dtos/attribute.dto';
import { AttributesRepository } from './repositories/attribute.repository';

@Injectable()
export class AttributesService {
  constructor(
    private dataSource: DataSource,
    private readonly attributesRepo: AttributesRepository,
    private readonly adapter: AttributesAdapter,
  ) {
  }

  async createAttribute(attributeDto: AttributeDto): Promise<CommonResponse> {
    const convesrion = this.adapter.convertDtotoEntity(attributeDto)
    const save = await this.attributesRepo.save(convesrion);
    return new CommonResponse(true, 1234, "created successfully")
  }
  async getAllAttributes(): Promise<GetAllAttributesResponce> {
    const getAll = await this.attributesRepo.find();
    const data: GetAllAttributeDto[] = [];
    for (const entity of getAll) {
      const convesrion = this.adapter.convertEntitytoDdto(entity);
      data.push(convesrion);
    }
    return new GetAllAttributesResponce(true, 1233, 'Data Retried Successfully', data)
  }
  async getAllAttributesDropDown(): Promise<GetAllAttributesDropDownResponse> {
    const dropdown = await this.attributesRepo.find({ select: ['attributeName', 'uuid'] });
    const data: GetAllAttributeDropDown[] = [];
    for (const entity of dropdown) {
      const dropdownConversion = this.adapter.convertDropDownEntityToDto(entity);
      data.push(dropdownConversion);
    }
    return new GetAllAttributesDropDownResponse(true, 1233, 'Data Retrieved Successfully', data)
  }
  
  async acticateAndDeactivatedAttributes(activateDto:ActivateAttributeDto): Promise<CommonResponse> {
    const deactivate = await this.attributesRepo.findOne({ where: { uuid:activateDto.id} });
    const activate = await this.attributesRepo.update({uuid:activateDto.id},{isActive:!deactivate.isActive})

  return new CommonResponse(true,1233,`status  ${deactivate.isActive ? 'Deactivated' : 'Activated'} successfully`);
  }
}
