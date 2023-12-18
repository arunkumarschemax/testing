import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from '../strategies';
import * as dotenv from 'dotenv';
import { ConfigService } from '../../config/config.service';
import { AuthenticationSubscriber } from '../../app/authentications/subscribers/authentication.subscriber';


dotenv.config();

const configService = new ConfigService();
configService.loadFromEnv();

export const typeOrmConfig: DataSourceOptions = {
  type: configService.get().database.type,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'finest_choicex_iam',
  migrations: ['dist/database/migrations/*.js*{.ts,.js}'],
  extra: {
    connectionLimit: configService.get().database.poolLimit,
    charset: configService.get().database.charset
  },
  synchronize: false,
  logging: true
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...typeOrmConfig,
      subscribers: [AuthenticationSubscriber],
      // namingStrategy: new SnakeNamingStrategy(),
      //logger: new QueryLogger(new PinoLogger({ pinoHttp: { level: configService.get().logLevel } })),
      autoLoadEntities: true
    };
  },
};
