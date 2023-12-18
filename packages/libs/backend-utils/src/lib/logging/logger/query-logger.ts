

import { Logger, QueryRunner } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

export class QueryLogger implements Logger {
    private logger;
    
     /**
     * 
     * @param logger 
     */
    constructor(logger: PinoLogger) {
        this.logger = logger;
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.trace({ stage:'TYPEORM LOGGER', queryStatus: 'SUCCESS', query: query, params: parameters});
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.error({ stage:'TYPEORM LOGGER', queryStatus: 'ERROR', query: query, params: parameters});
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.error({ stage:'TYPEORM LOGGER', queryStatus: 'SLOW QUERY', time: time, query: query, params: parameters});
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        //
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        this.logger.debug(message);
    }

    log(level: "log"|"info"|"warn", message: any, queryRunner?: QueryRunner) {
        switch (level) {
          case "log":
          case "info":
            this.logger.info(message);
            break;
          case "warn":
            this.logger.warn(message);
            break;
        }
    }
}