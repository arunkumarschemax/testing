import { LoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';


export class NestJsLogger implements LoggerService {

    private logger: PinoLogger;

    /**
     * 
     * @param logger 
     */
    constructor(logger: PinoLogger) {
        this.logger = logger;
    }

    error(message: any, trace?: string, context?: string) {
        this.logger.error({ stage:'NEST JS LOGGER', status: 'ERROR', message: message, stackTrace: trace, context: context});
    }

    log(message: any, context?: string) {
        this.logger.info({ stage:'NEST JS LOGGER', status: 'INFO', message: message, context: context});
    }

    warn(message: any, context?: string) {
        this.logger.debug({ stage:'NEST JS LOGGER', status: 'WARNING', message: message, context: context});
    }

}
