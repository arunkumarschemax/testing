import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {

    }
    @Post('create')
  async create(@Body() createDto:any):Promise<any>{
    try{
      return await this.rolesService.create(createDto)
    }catch(error){
      //return this.rolesExceptionHandler.returnException(error)
    }
    
  }
 
  @Post('getAllRoles')
  async getAllRoles():Promise<any>{
    try{
      return await this.rolesService. getAllRoles()
    }catch(error){
      //return this.rolesExceptionHandler.returnException(error);
    }
    
  }
  @Post('getRolesById')
  async getApplicationById(id:string):Promise<any>{
    try{
      return await this.rolesService.getRolesById(id)
    }catch(error){
      //return this.rolesExceptionHandler.returnException(error);
    }
    
  }
  @Post('activateOrdeactivate')
  async activateOrDeactivate(@Body() deactivateDto:any):Promise<any>{
    try{
      return await this.rolesService.activateOrDeactivate(deactivateDto)
    }catch(error){
      //return this.rolesExceptionHandler.returnException(error)
    }
    
  }
  @Post('getRolesAllDropDown')
  async getRolesAllDropDown( dropDownDto:any):Promise<any>{
    try{
      return await this.rolesService.getRolesAllDropDown()
    }catch(error){
      //return this.rolesExceptionHandler.returnException(error)
    }
    
  }

}
