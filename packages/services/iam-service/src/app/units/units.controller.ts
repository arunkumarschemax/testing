import { Body, Controller, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { UnitDto } from './dto/units.dto';
import { CommonResponse, GetAllUnitsDropDownResponse, GetAllUnitsResponse, OrganizationReqDto } from '@finestchoicex-iam/shared-models';
import { UnitIdDto } from './dto/unit-id-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationIdReqDto } from '../organization/dtos/activate.dto';
@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @Post('createUnit')
  async createUnit(@Body() unitDto: UnitDto): Promise<CommonResponse> {
    try {
      return await this.unitsService.createUnit(unitDto);

    } catch (error) {
      throw returnException(CommonResponse, error);
    }
  }

  @Post('getAllUnits')
  async getAllUnits(): Promise<GetAllUnitsResponse> {
    try {
      return await this.unitsService.getAllUnits();
    } catch (error) {
      return returnException(GetAllUnitsResponse, error);
    }
  }

  @Post('getAllUnitsDropDown')
  async getAllUnitsDropDown(@Body() req: OrganizationReqDto): Promise<GetAllUnitsDropDownResponse> {
    try {
      return await this.unitsService.getAllUnitsDropDown(req);
    } catch (error) {
      return returnException(GetAllUnitsDropDownResponse, error);
    }
  }

  @Post('activateOrDeactivateUnits')
  async ActivateDeactivateUnitDto(@Body() activateDto: UnitIdDto): Promise<CommonResponse> {
    try {
      return await this.unitsService.ActivateDeactivateUnitDto(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getUnitsByOrgId')
  async getUnitsByOrgId(@Body() req: OrganizationIdReqDto): Promise<GetAllUnitsResponse> {
    try {
      return await this.unitsService.getUnitsByOrgId(req);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }
}