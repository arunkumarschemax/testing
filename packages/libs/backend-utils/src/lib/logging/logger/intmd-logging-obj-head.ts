import { Logger, PinoLogger } from 'nestjs-pino';

export class IntermediateLoggingObjectHeader {
    functionName: string;
    logger: PinoLogger;
    loggingMode?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
}
