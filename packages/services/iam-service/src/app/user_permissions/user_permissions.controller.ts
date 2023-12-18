import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserPermissionsService } from './user_permissions.service';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private readonly userPermissionsService: UserPermissionsService) {}

    @Post()
  saveUserPermission(@Body() userPermissionData: any) {
   
  }

  @Get()
  getAllUserPermission() {
    
  }

  @Get(':id')
  getUserPermissionById(@Param('id') id: string) {
 
  }

  @Put(':id')
  activateOrDeactivateUserPermission(@Param('id') id: string, @Body() userPermissionData: any) {
   
  }

  @Get('dropdown')
  getAllUserPermissionDropDown() {
   
  }
}
