import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menus.dto';

@Injectable()
export class MenuService {
  menuRepository: any;
  menuService: any;

    async create(menuDto: MenuDto): Promise<any> {
    const menu = this.menuRepository.create(menuDto);
    return await this.menuRepository.save(menu);
  
  }


  async getAllMenus(): Promise<any[]> {
    return await this.menuRepository.find();
  }

 
  async activateOrDeactivate(deactivateDto: any): Promise<Response> {
    try {
      
      return await this.menuService.activateOrDeactivate(deactivateDto);
    } catch (error) {
      
      throw new Error('Failed to activate or deactivate menu');
    }
  }

  async getAllMenusDropDownDto(): Promise<any> {
    
  }
 
}
