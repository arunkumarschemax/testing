import { ConfigDataType } from './config.interface';

export const DEFAULT_CONFIG: ConfigDataType = {
  env: 'development',
  port: 8006,
  logLevel: 'info',
  maxPayloadSize: '1000mb',
  responseTimeOut: 600,
  staticFilesFolder: 'files',
  database: {
    type: 'mysql',
    host: '143.244.137.136',
    port: 3306,
    username: 'xpparel',
    password: 'Schemax@23',
    dbName: 'xapparel_users',
    poolLimit: 20,
    charset: 'utf8_general_ci'
  },
  rateLimiting: {
    ttl: 60,
    limit: 10,
    maxLoginAttempts: 3
  },
  appSepcific: {
    palletRollCapacity: 10
  },
  jwtConfig: {
    jwtSecret: 'rebats',
    jwtExpiryTime: '300s',   //seconds(15 mins)     
    refreshSecret: 'rebats_refresh',
    refreshExpiryTime: '7d',//days(one week)
    jwtByCookieOrHeader: 'cookie'
  },
};
