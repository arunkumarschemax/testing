import { Body, Controller, Post } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService
    ) {

  }
  @Post('create')
  async create(@Body() createDto:any):Promise<any>{
    try{
      return await this.modulesService.create(createDto)
    }catch(error){
      //return this.modulesExceptionHandler.returnException(error)
    }
    
  }
  @Post('getAllModules')
  async getAllModules():Promise<any>{
    try{
      return await this.modulesService. getAllModules()
    }catch(error){
      //return this.modulesExceptionHandler.returnException(error);
    }
    
  }
  @Post('getModulesById')
  async getModulesById(id:string):Promise<any>{
    try{
      return await this.modulesService.getModulesById(id)
    }catch(error){
      //return this.modulesExceptionHandler.returnException(error);
    }
    
  }
  @Post('activateOrdeactivate')
  async activateOrDeactivate(@Body() deactivateDto:any):Promise<any>{
    try{
      return await this.modulesService.activateOrDeactivate(deactivateDto)
    }catch(error){
      //return this.modulesExceptionHandler.returnException(error)
    }
    
  }
  @Post('getModulesAllDropDown')
  async getModulesAllDropDown( dropDownDto:any):Promise<any>{
    try{
      return await this.modulesService.getModulesAllDropDown()
    }catch(error){
      //return this.modulesExceptionHandler.returnException(error)
    }
    
  }


}
