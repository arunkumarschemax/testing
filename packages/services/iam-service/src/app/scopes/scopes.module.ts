import { Module } from '@nestjs/common';
import { ScopeService } from './scopes.service';
import { ScopeController } from './scopes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scopes } from './entites/scopes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scopes])],
  controllers: [ScopeController],
  providers: [ScopeService]
})
export class ScopesModule { }
