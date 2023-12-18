import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from './menus.service';
import { MenuDto } from './dto/menus.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }
  private readonly applicationExceptionHandler: any

  @Post('create')
  async create(menuDto: MenuDto): Promise<any> {
    try {

      const createdMenu = await this.menuService.create(menuDto);
      return createdMenu;
    } catch (error) {

      throw new Error('Failed to create menu');
    }
  }

  @Post('getAllMenus')
  async getAllMenus(): Promise<any> {
    try {

      const menus = await this.menuService.getAllMenus();
      return menus;
    } catch (error) {

      throw new Error('Failed to retrieve menus');
    }
  }

  @Post('activateOrDeactivate')
  async activateOrDeactivate(@Body() deactivateDto: any): Promise<any> {
    try {
      return await this.menuService.activateOrDeactivate(deactivateDto);
    } catch (error) {
      this.applicationExceptionHandler.returnException({}, error)
    }
  }

  @Post('getAllMenusDropDownDto')
  async getAllMenusDropDownDto(): Promise<any> {
    try {
      return await this.menuService.getAllMenusDropDownDto();

    } catch (error) {
      this.applicationExceptionHandler.returnException({}, error)
    }
  }
}


