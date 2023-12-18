import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationRepo } from './repo/organization.repo';
import { OrganizationAdapter } from './repo/adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization])
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService,OrganizationRepo,OrganizationAdapter],
  exports: [TypeOrmModule]
})
export class OrganizationModule { }
