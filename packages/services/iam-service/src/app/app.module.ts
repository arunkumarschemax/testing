import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from '../config/configuration';
import { DatabaseModule } from '../database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { AttributesModule } from './attributes/attributes.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ClientAppsModule } from './client-applications/client-apps.module';
import { MenusModule } from './menus/menus.module';
import { ModulesModule } from './modules/modules.module';
import { OrganizationModule } from './organization/organization.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { RolesModule } from './roles/roles.module';
import { ScopesModule } from './scopes/scopes-module';
import { SubMenusModule } from './sub-menus/sub-menus.module';
import { UnitsModule } from './units/units.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserToAttributesModule } from './user-to-attributes/user-to-attributes.module';
import { UsersModule } from './users/users.module';
import { middlewareHandler } from './middleware';
import { snakeCase } from 'typeorm/util/StringUtils';


const fullPath = __dirname;
const newPath = fullPath.replace(/\\dist/, ''); // Using double backslashes to escape the backslash
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ([{
        rootPath: join(newPath, 'files', ''),  //http://localhost:8006/2023-06-15%20(1).png
        // serveRoot: "/extraPath/"    // last slash was important  http://localhost:8006/extraPath/2023-06-15%20(1).png
      }])
    }),
    DatabaseModule,
    AttributesModule,
    OrganizationModule,
    ClientAppsModule,
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
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(middlewareHandler).forRoutes({path:'*/getData*',method:RequestMethod.POST})
  }
}
