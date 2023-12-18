import { CommonResponse, GetAllAttributesDropDownResponse, GetAllAttributesResponse } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { returnException } from 'packages/libs/backend-utils/src/lib/exception-handling';
import { AttributesService } from './attributes.service';
import { AttributeIdReqDto } from './dtos/activate.dto';
import { AttributeDto } from './dtos/attribute.dto';

@ApiTags('Attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) { }

  @Post('createAttribute')
  async createAttribute(@Body() atbDto: AttributeDto): Promise<CommonResponse> {
    try {
      return await this.attributesService.createAttribute(atbDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }
  @Post("getAllAttributes")
  async getAllAttributes(): Promise<GetAllAttributesResponse> {
    try {
      return await this.attributesService.getAllAttributes()
    } catch (error) {
      return returnException(GetAllAttributesResponse, error);
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
  @Post('activateAndDeactivatedAttributes')
  async activateAndDeactivatedAttributes(@Body() activateDto:AttributeIdReqDto): Promise<CommonResponse>{
    try {
      return await this.attributesService.activateAndDeactivatedAttributes(activateDto);
    } catch (error) {
      return  returnException(CommonResponse,error);
    }
  }
}
