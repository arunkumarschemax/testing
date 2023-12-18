import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesEntity } from './entities/attributes.entity';
import { AttributesRepository } from './repositories/attribute.repository';
import { AttributesAdapter } from './adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttributesEntity])
  ],
  controllers: [AttributesController],
  providers: [AttributesService, AttributesRepository, AttributesAdapter,],
  exports: [TypeOrmModule]
})
export class AttributesModule { }
