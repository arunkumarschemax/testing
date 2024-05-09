import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from '../strategies';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { AuthenticationSubscriber } from '../../app/authentications/subscribers/authentication.subscriber';

const databaseConfig = configuration().database;
export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: +'3306',
  username: 'root',
  password: '',
  database: 'finest_choicex_iam',
  timezone: 'Z',
  migrations: ['dist/database/migrations/*.js*{.ts,.js}'],
  extra: {
    connectionLimit: databaseConfig.poolLimit,
    charset: databaseConfig.charset
  }
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      ...typeOrmConfig,
      synchronize: false,
      logging: false,
      subscribers: [AuthenticationSubscriber],
      namingStrategy: new SnakeNamingStrategy(),
      //logger: new QueryLogger(new PinoLogger({ pinoHttp: { level: configService.get().logLevel } })),
      autoLoadEntities: true
    }
  },
};

