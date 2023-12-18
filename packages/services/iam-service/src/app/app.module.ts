import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database';
import { UnitsModule } from './units/units.module';
import { ScopesModule } from './scopes/scopes.module';
import { MenusModule } from './menus/menus.module';
import { SubMenusModule } from './sub_menus/sub_menus.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { UserPermissionsModule } from './user_permissions/user_permissions.module';
import { AttributesModule } from './attributes/attributes.module';
import { OrganizationModule } from './organization/organization.module';
import { UsersModule } from './users/users.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { UserToAttributesModule } from './user_to_attributes/user-to-attributes.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user-roles.module';
import { ApplicationsModule } from './applications/applications.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ 
    ConfigModule,
    DatabaseModule,
    AttributesModule,
    OrganizationModule,
    UnitsModule,
    ScopesModule,
    MenusModule,
    SubMenusModule,
    PermissionsModule,
    RolePermissionsModule,
    UserPermissionsModule,
    UsersModule,
    AuthenticationsModule,
    UserToAttributesModule,
    RolesModule,
    UserRolesModule,
    ApplicationsModule,
    ModulesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
