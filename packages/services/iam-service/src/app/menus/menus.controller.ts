import { Body, Controller, Post } from '@nestjs/common';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { MenuDto } from './dto/menus.dto';
import { MenuService } from './menus.service';
import { AppModuleIdReqDto, CommonResponse, MenusDropDownResponse, GetAllMenusResponse, MenusDto } from '@finestchoicex-iam/shared-models';
import { ActivateMenuDto } from './dto/activate.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menuService: MenuService) { }

  @Post('createMenu')
  async createMenu(@Body() menuDto: MenusDto): Promise<CommonResponse> {
    try {
      return await this.menuService.createMenu(menuDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getAllMenus')
  async getAllMenus(): Promise<GetAllMenusResponse> {
    try {
      return await this.menuService.getAllMenus();
    } catch (error) {
      return returnException(GetAllMenusResponse, error);
    }
  }

  @Post('getAllMenusByModuleAndAppId')
  async getAllMenusByModuleAndAppId(@Body() req: AppModuleIdReqDto): Promise<GetAllMenusResponse> {
    try {
      return await this.menuService.getAllMenusByModuleAndAppId(req);
    } catch (error) {
      return returnException(GetAllMenusResponse, error);
    }
  }

  @Post('getAllMenusDropDown')
  async getAllMenusDropDown(): Promise<MenusDropDownResponse> {
    try {
      return await this.menuService.getAllMenusDropDown();
    } catch (error) {
      return returnException(MenusDropDownResponse, error);
    }
  }

  @Post('getAllMenusDropDownByModuleAndAppId')
  async getAllMenusDropDownByModuleAndAppId(@Body() req: AppModuleIdReqDto): Promise<MenusDropDownResponse> {
    try {
      return await this.menuService.getAllMenusDropDownByModuleAndAppId(req);
    } catch (error) {
      return returnException(MenusDropDownResponse, error);
    }
  }

  @Post('activateOrDeactivateMenu')
  async activateOrDeactivateMenu(@Body() activateDto: ActivateMenuDto): Promise<CommonResponse> {
    try {
      return await this.menuService.activateAndDeactivatedMenu(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
