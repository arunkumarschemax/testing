import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModulesEntity } from './entities/modules.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesRepository } from './repositorys/module.repo';
import { ModulesAdapter } from './modules-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([ModulesEntity])],
  controllers: [ModulesController],
  providers: [ModulesService,ModulesAdapter,ModulesRepository]
})
export class ModulesModule { }
