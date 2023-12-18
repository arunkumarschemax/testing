import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubMenuDto } from './dto/sub_menus.dto';
import { SubMenu } from './entities/sub_menus.entity';

@Injectable()
export class SubMenuService {


  constructor(
    @InjectRepository(SubMenu)
    private readonly subMenuRepository: Repository<SubMenu>,
  ) { }

  async create(subMenuDto: SubMenuDto): Promise<SubMenu> {
    const subMenu = this.subMenuRepository.create(subMenuDto);
    return await this.subMenuRepository.save(subMenu);
  }

  async getAllSubMenus(): Promise<SubMenu[]> {
    return await this.subMenuRepository.find();
  }

  async getSubMenuById(id: number): Promise<SubMenu> {
    return await this.subMenuRepository.findOne({});
  }

  async activateOrDeactivate(subMenuDto: SubMenuDto): Promise<SubMenu> {
    const subMenu = await this.subMenuRepository.findOne({});
    if (!subMenu) {
      throw new Error('SubMenu not found');
    }

    subMenu.isActive = subMenuDto.isActive;
    return await this.subMenuRepository.save(subMenu);
  }

  async getAllDropDown(): Promise<SubMenu[]> {
    return await this.subMenuRepository.find({
      select: ['id', 'name'],
    });
  }
}
