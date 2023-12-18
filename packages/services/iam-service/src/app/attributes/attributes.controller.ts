import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonResponse, returnException } from 'packages/libs/backend-utils/src/lib/exception-handling';
import { AttributesService } from './attributes.service';
import { ActivateAttributeDto } from './dtos/activate.dto';
import { AttributeDto } from './dtos/attribute.dto';
import { GetAllAttributesDropDownResponse, GetAllAttributesResponce } from '@finestchoicex-iam/shared-services';

@ApiTags('Attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) { }

  @Post('createAttribute')
  async createAttrobute(@Body() atbDto: AttributeDto): Promise<CommonResponse> {
    try {
      return await this.attributesService.createAttribute(atbDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }
  @Post("getAllAttributes")
  async getAllAttributes(): Promise<GetAllAttributesResponce> {
    try {
      return await this.attributesService.getAllAttributes()
    } catch (error) {
      return returnException(GetAllAttributesResponce, error);
    }
  }
  @Post('getAllAttributesDropDown')
  async getAllAttributesDropDown(): Promise<GetAllAttributesDropDownResponse> {
    try {
      return await this.attributesService.getAllAttributesDropDown();
    } catch (error) {
      return returnException(GetAllAttributesDropDownResponse, error);
    }
  }
  @Post('acticateAndDeactivatedAttributes')
  async acticateAndDeactivatedAttributes(@Body() activateDto:ActivateAttributeDto): Promise<CommonResponse>{
    try {
      return await this.attributesService.acticateAndDeactivatedAttributes(activateDto);
    } catch (error) {
      return  returnException(CommonResponse,error);
    }
  }
}
