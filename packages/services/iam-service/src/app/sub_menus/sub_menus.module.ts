import { Module } from '@nestjs/common';
import { SubMenuService } from './sub_menus.service';
import { SubMenuController } from './sub_menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubMenu } from './entities/sub_menus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubMenu])],
  controllers: [SubMenuController],
  providers: [SubMenuService]
})
export class SubMenusModule { }
