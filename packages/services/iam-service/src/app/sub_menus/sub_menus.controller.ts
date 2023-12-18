import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SubMenuService } from './sub_menus.service';
import { SubMenuDto } from './dto/sub_menus.dto';

@Controller('sub-menus')
export class SubMenuController {
  constructor(private readonly subMenuService: SubMenuService) {}

 
  
    @Post()
    async create(@Body() subMenuDto: SubMenuDto): Promise<any> {
      try {
        return await this.subMenuService.create(subMenuDto);
      } catch (error) {
        throw new Error('Failed to create submenu');
      }
    }
  
    @Get()
    async getAllMenu(): Promise<any> {
      try {
        return await this.subMenuService.getAllSubMenus();
      } catch (error) {
        throw new Error('Failed to retrieve submenus');
      }
    }
  
    @Get(':id')
    async getMenuById(@Param('id') id: number): Promise<any> {
      try {
        return await this.subMenuService.getSubMenuById(id);
      } catch (error) {
        throw new Error('Failed to retrieve submenu');
      }
    }
  
    @Post('activateOrDeactivate')
    async activateOrDeactivate(@Body() subMenuDto: SubMenuDto): Promise<any> {
      try {
        return await this.subMenuService.activateOrDeactivate(subMenuDto);
      } catch (error) {
        throw new Error('Failed to activate or deactivate submenu');
      }
    }
  
    @Get('dropdown')
    async getAllMenuDropDown(): Promise<any> {
      try {
        return await this.subMenuService.getAllDropDown();
      } catch (error) {
        throw new Error('Failed to retrieve submenus dropdown');
      }
    }
  }