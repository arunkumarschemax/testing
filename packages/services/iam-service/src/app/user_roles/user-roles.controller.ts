import { Body, Controller, Post } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService
  ) {

  }
  @Post('create')
  async create(@Body() createDto: any): Promise<any> {
    try {
      return await this.userRolesService.create(createDto)
    } catch (error) {
      //return this.userRolesControllerExceptionHandler.returnException(error)
    }

  }
  @Post('getAllUserRoles')
  async getAllUserRoles(): Promise<any> {
    try {
      return await this.userRolesService.getAllUserRoles()
    } catch (error) {
      //return this.userRolesControllerExceptionHandler.returnException(error);
    }

  }
  @Post('getUserRolesById')
  async getUserRolesById(id: string): Promise<any> {
    try {
      return await this.userRolesService.getUserRolesById(id)
    } catch (error) {
      //return this.userRolesControllerExceptionHandler.returnException(error);
    }

  }
  // @Post('activateOrdeactivate')
  // async activateOrDeactivate(@Body() deactivateDto:any):Promise<any>{
  //   try{
  //     return await this.userRolesService.activateOrDeactivate(deactivateDto)
  //   }catch(error){
  ////     return this.userRolesControllerExceptionHandler.returnException(error)
  //   }

  // }
  // @Post('getRolesAllDropDown')
  // async getUserRolesAllDropDown(@Body() dropDownDto:any):Promise<any>{
  //   try{
  //     return await this.userRolesService.getRolesAllDropDown(dropDownDto)
  //   }catch(error){
  ////     return this.userRolesControllerExceptionHandler.returnException(error)
  //   }

  // }





}
