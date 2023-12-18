import { Module } from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsController } from './user-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermsRepository } from './repo/user-perm.repo';
import { UserPermsAdapter } from './user-permisons-adapter';
import { UserPermissionEntity } from './entities/user-permissions.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserPermissionEntity])],
  controllers: [UserPermissionsController],
  providers: [UserPermissionsService, UserPermsRepository,UserPermsAdapter]
})
export class UserPermissionsModule { }
