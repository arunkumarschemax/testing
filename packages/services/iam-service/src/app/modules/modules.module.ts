import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModulesEntity } from './entities/modules.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ModulesEntity])],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule { }
