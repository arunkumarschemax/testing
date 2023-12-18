import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { RolesRepository } from './repositories/roles.repo';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesAdapter } from './adapters/roles.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository, RolesAdapter],
  exports: [RolesService]
})
export class RolesModule { }
