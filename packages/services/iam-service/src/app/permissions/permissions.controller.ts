import { Body, Controller, Delete, Get, Param, Post, Put, Scope } from '@nestjs/common';
import { PermissionService } from './permissions.service';
import { PermissionDto } from './dto/permissions.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionService) {}
  private readonly  applicationExceptionHandler:any;

  @Post('savePermissions')
  async  savePermissions(@Body() permissionDto: PermissionDto) {
    try{
      return await this.permissionsService.savePermissions(permissionDto);
    } catch(error) {
      return
      this.applicationExceptionHandler.returnException(Response,error);
    }
  }

  @Get()
  getAllPermissions() {
    
  }

  @Get(':id')
  getPermissionsById(@Param('id') id: string) {
   
  }

  @Put(':id')
  updatePermissions(@Param('id') id: string, @Body() permissionsData: Scope) {
   
  }

  @Delete(':id')
  deletePermissions(@Param('id') id: string) {
    
  }


}
