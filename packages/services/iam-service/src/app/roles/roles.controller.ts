import { Body, Controller, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dtos/roles.dto';
import { CommonResponse, GetAllRolesDropDownResponse, GetAllRolesResponse, UnitIdDto } from '@finestchoicex-iam/shared-models';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { RolesIdReqDto } from './dtos/activate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {

    }
    @Post('createRoles')
    async createRoles(@Body() createDto: RolesDto): Promise<CommonResponse> {
      try {
        return await this.rolesService.createRoles(createDto)
      } catch (error) {
        return returnException(CommonResponse, error);
      }
  
    };
 
    @Post('getAllRoles')
    async getAllRoles(): Promise<GetAllRolesResponse> {
      try {
        return await this.rolesService.getAllRoles()
      } catch (error) {
        return returnException(GetAllRolesResponse, error);
      }
  
    };
  // @Post('getRolesById')
  // async getApplicationById(id:string):Promise<any>{
  //   try{
  //     return await this.rolesService.getRolesById(id)
  //   }catch(error){
  //     //return this.rolesExceptionHandler.returnException(error);
  //   }
    
  // }
  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: RolesIdReqDto): Promise<CommonResponse> {
    try {
      return await this.rolesService.activateOrDeactivate(deactivateDto)
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  };

  @Post('getRolesDropDown')
  async getAllRolesDropDown(): Promise<GetAllRolesDropDownResponse> {
    try {
      return await this.rolesService.getAllRolesDropDown()
    } catch (error) {
      return returnException(GetAllRolesDropDownResponse, error);
    }
  }

  @Post('getAllRolesDropDownByUnitId')
  async getAllRolesDropDownByUnitId(): Promise<GetAllRolesDropDownResponse> {
    try {
      return await this.rolesService.getAllRolesDropDownByUnitId()
    } catch (error) {
      return returnException(GetAllRolesDropDownResponse, error);
    }
  }



  @Post('getAllRolesByUnitId')
  async getAllRolesByUnitId(@Body() req: UnitIdDto): Promise<GetAllRolesResponse> {
    try {
      return await this.rolesService.getAllRolesByUnitId(req);
    } catch (error) {
      return returnException(GetAllRolesResponse, error);
    }
  }
}
