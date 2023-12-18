import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData, RedisConfig } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {

    const dBType: any = process.env[`APP_DB_TYPE`] || DEFAULT_CONFIG.database.type;
    return {
      env: env.APP_ENV || DEFAULT_CONFIG.env,
      port: env.APP_SERVER_PORT ? parseInt(env.APP_SERVER_PORT, 10) : DEFAULT_CONFIG.port,
      logLevel: env.APP_LOGGING_MODE || DEFAULT_CONFIG.logLevel,
      maxPayloadSize: env.APP_MAX_PAY_LOAD_SIZE || DEFAULT_CONFIG.maxPayloadSize,
      responseTimeOut: env.APP_RESPONSE_TIME_OUT ? parseInt(env.APP_RESPONSE_TIME_OUT) : DEFAULT_CONFIG.responseTimeOut,
      staticFilesFolder: env.APP_FILES_STORE_FOLDER_NAME || DEFAULT_CONFIG.staticFilesFolder,
      database: {
        type: dBType,
        host: process.env[`APP_DB_HOST`] || DEFAULT_CONFIG.database.host,
        port: parseInt(process.env[`APP_DB_PORT`]) || DEFAULT_CONFIG.database.port,
        username: process.env[`APP_DB_USER`] || DEFAULT_CONFIG.database.username,
        password: process.env[`APP_DB_PASS`] || DEFAULT_CONFIG.database.password,
        dbName: process.env[`APP_DB_DBNAME`] || DEFAULT_CONFIG.database.dbName,
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || DEFAULT_CONFIG.database.poolLimit,
        charset: process.env[`APP_DB_CHARSET`] || DEFAULT_CONFIG.database.charset,
      },
      rateLimiting: {
        ttl: parseInt(process.env['APP_THROTTLE_TTL']) || DEFAULT_CONFIG.rateLimiting.ttl,
        limit: parseInt(process.env['APP_THROTTLE_LIMIT']) || DEFAULT_CONFIG.rateLimiting.limit,
        maxLoginAttempts: parseInt(process.env['APP_THROTTLE_MAX_LOGINS']) || DEFAULT_CONFIG.rateLimiting.maxLoginAttempts,
      },
      jwtConfig: {
        jwtSecret: process.env[`APP_JWT_ACCESS_TOKEN_SECRET`] || DEFAULT_CONFIG.jwtConfig.jwtSecret,
        jwtExpiryTime: process.env[`APP_JWT_ACCESS_TOKEN_EXPIRATION_TIME`] || DEFAULT_CONFIG.jwtConfig.jwtExpiryTime,   //seconds(15 mins)     
        refreshSecret: process.env[`APP_JWT_REFRESH_TOKEN_SECRET`] || DEFAULT_CONFIG.jwtConfig.refreshSecret,
        refreshExpiryTime: process.env[`APP_JWT_REFRESH_TOKEN_TOKEN_EXPIRATION_TIME`] || DEFAULT_CONFIG.jwtConfig.refreshExpiryTime,//days(one week)
        jwtByCookieOrHeader: process.env['APP_JWT_BY_COOKIE_OR_HEADER'] || DEFAULT_CONFIG.jwtConfig.jwtByCookieOrHeader
      }
    };
  }
  /**
   * Retrieves the config.
   * @returns immutable view of the config data
   */
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
