import { Module } from '@nestjs/common';
import { MenuService } from './menus.service';
import { MenuController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menus } from './entities/menus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menus])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenusModule { }
