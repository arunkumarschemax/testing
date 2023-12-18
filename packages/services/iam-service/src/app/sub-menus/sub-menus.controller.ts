import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse, SubMenusDropDownResponse, GetAllSubMenusResponse, SubMenuDto, AppModuleIdReqDto, AppModuleMenuIdReqDto } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { SubMenusService } from './sub-menus.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('SubMenus')
@Controller('subMenus')
export class SubMenuController {
  constructor(private readonly subMenuService: SubMenusService) { }



  @Post('createSubmenu')
  async create(@Body() subMenuDto: SubMenuDto): Promise<CommonResponse> {
    try {
      return await this.subMenuService.createSubMenu(subMenuDto);
    } catch (error) {
      throw returnException(CommonResponse, error);
    }
  }

  @Post('getAllSubMenus')
  async getAllSubMenus(): Promise<GetAllSubMenusResponse> {
    try {
      return await this.subMenuService.getAllSubMenus();
    } catch (error) {
      return returnException(GetAllSubMenusResponse, error);
    }
  }

  @Post('getAllSubMenusByMenuModuleAndAppId')
  async getAllSubMenusByMenuModuleAndAppId(@Body() req: AppModuleMenuIdReqDto): Promise<GetAllSubMenusResponse> {
    try {
      return await this.subMenuService.getAllSubMenusByMenuModuleAndAppId(req);
    } catch (error) {
      return returnException(GetAllSubMenusResponse, error);
    }
  }

  @Post('getAllSubMenusDropDown')
  async getAllSubMenuDropDown(): Promise<SubMenusDropDownResponse> {
    try {
      return await this.subMenuService.getAllSubMenusDropDown();
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }

  @Post('getAllSubMenusDropDownByMenuModuleAndAppId')
  async getAllSubMenusDropDownByMenuModuleAndAppId(@Body() req: AppModuleMenuIdReqDto): Promise<SubMenusDropDownResponse> {
    try {
      return await this.subMenuService.getAllSubMenusDropDownByMenuModuleAndAppId(req);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }



  @Post('activateOrDeactivateSubMenu')
  async activateOrDeactivateSubMenu(@Body() subMenuDto: SubMenuDto): Promise<CommonResponse> {
    try {
      return await this.subMenuService.activateOrDeactivateSubMenu(subMenuDto);
    } catch (error) {
      throw new Error('Failed to activate or deactivate submenu');
    }
  }


}