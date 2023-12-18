import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  port: 3000,
  logLevel: 'info',
  maxPayloadSize: '1000mb',
  responseTimeOut: 600,
  staticFilesFolder: 'files',
  database: {
    type: 'mysql',
    host: 'dev.schemaxtech.in',
    port: 3306,
    username: 'sa_dev_user',
    password: 'Schemax@23',
    dbName: 'iam',
    poolLimit: 20,
    charset: 'utf8mb4_unicode_ci'
  },
  rateLimiting: {
    ttl: 60,
    limit: 10,
    maxLoginAttempts: 3
  },
  jwtConfig: {
    jwtSecret: 'rebats',
    jwtExpiryTime: '300s',   //seconds(15 mins)     
    refreshSecret: 'rebats_refresh',
    refreshExpiryTime: '7d',//days(one week)
    jwtByCookieOrHeader: 'cookie'
  },
};
