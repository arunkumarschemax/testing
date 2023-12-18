import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsAdapter } from './adapter/application.adapter';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationEntity } from './entities/application.entity';
import { ApplicationRepository } from './repositories/application.repo';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsAdapter, ApplicationRepository]
})
export class ApplicationsModule { }
