import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { UserRepo } from './user-repo/user-repo';
import { UsersAdapter } from './user-repo/adapter';
import { DataSource } from 'typeorm';
import { AuthenticationsModule } from '../authentications/authentications.module';
import { AuthenticationsService } from '../authentications/authentications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,DataSource]),
    AuthenticationsModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepo, UsersAdapter],
  exports: [TypeOrmModule],
})
export class UsersModule { }
