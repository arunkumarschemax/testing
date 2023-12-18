import { PinoLogger } from 'nestjs-pino';
import { IntermediateLoggingObjectHeader } from './intmd-logging-obj-head';
import { ErrorResponse } from '../../exception-handling';

class LogActionParams {
    isAsync?: boolean = false;
    params?: any;
}

/**
 * a decorator function that logs the request , response and exception params for the decorated method
 * @param logParam an optional log param for logging
 */
export function LogActions(logParam?: LogActionParams){
    return function logActionsDecorator(target: Object, property: string, descriptor: PropertyDescriptor) {
        let logger: PinoLogger;
        let loggingMode: string;
        let isAsyncFn: boolean;
        if (logParam) {
            isAsyncFn = logParam.isAsync;
        }
        // if(!target.constructor) {
        //     throw Error('PinoLogger must be passed as a param to the service in order to use @LogActions() decorator');
        // }
        try {
            const className = target.constructor.name;
            const original = descriptor.value;
            if (typeof original === 'function') {
                // re declaring the actual method definition call
                if(isAsyncFn) {
                    descriptor.value = async function(...args) {
                        try {
                            // getting the logger instance from the caller class
                            logger = target.constructor['logger'];
                            loggingMode = target.constructor['loggingMode'];
                            let result;
                            // logging the request objects and other info before the method is being invoked
                            if(loggingMode === 'trace' || loggingMode === 'debug') {
                                if (loggingMode === 'trace') {
                                    // constructing the object of form {'arg1': any, 'arg2': any, ... } for the input request params of the calling method for the purpose of logging
                                    const requestParams = {};
                                    args.forEach((arg, index) => {
                                        requestParams['arg'+index] = arg;
                                    });
                                    logger.trace({'stage': 'REQUEST IN', 'serviceName': className, 'functionName' : property, 'arguments': requestParams, 'logParams': logParam});
                                } else if (loggingMode === 'debug') {
                                    logger.debug({'stage': 'REQUEST IN', 'serviceName': className, 'functionName' : property, 'logParams': logParam});
                                }

                                // invoking the method by passing the same arguments as we recieved at the time of the later methods invocation
                                result = await original.apply(this, args);

                                // logging the response of the method
                                if (loggingMode === 'trace') {
                                    logger.trace({'stage': 'RESPONSE OUT', 'serviceName': className, 'functionName' : property, 'returns' : result});
                                } else if (loggingMode === 'debug') {
                                    logger.debug({'stage': 'RESPONSE OUT', 'serviceName': className, 'functionName' : property});
                                }
                            } else {
                                result = await original.apply(this, args);
                            }
                            return result;
                        } catch (error) {
                            // logging the errors / exceptions that are incurred within the method
                            if(error instanceof ErrorResponse) {
                                // handled exceptions
                                logger.error({'stage': 'APPLICATION EXCEPTION', 'serviceName': className,'functionName' : property, 'Error': error});
                            } else {
                                // system exceptions
                                logger.error({'stage': 'SYSTEM EXCEPTION', 'serviceName': className,'functionName' : property, 'Error': error.message, 'stackTrace': error.stack});
                            }
                            throw error;
                        }
                    }
                } else {
                    descriptor.value = function(...args) {
                        try {
                            // getting the logger instance from the caller class
                            logger = target.constructor['logger'];
                            loggingMode = target.constructor['loggingMode'];
                            let result;
                            // logging the request objects and other info before the method is being invoked
                            if(loggingMode === 'trace' || loggingMode === 'debug') {
                                if (loggingMode === 'trace') {
                                    // constructing the object of form {'arg1': any, 'arg2': any, ... } for the input request params of the calling method for the purpose of logging
                                    const requestParams = {};
                                    args.forEach((arg, index) => {
                                        requestParams['arg'+index] = arg;
                                    });
                                    logger.trace({'stage': 'REQUEST IN', 'serviceName': className, 'functionName' : property, 'arguments': requestParams, 'logParams': logParam});
                                } else if (loggingMode === 'debug') {
                                    logger.debug({'stage': 'REQUEST IN', 'serviceName': className, 'functionName' : property, 'logParams': logParam});
                                }
                                // invoking the method by passing the same arguments as we recieved at the time of the later methods invocation
                                result = original.apply(this, args);

                                // logging the response of the method
                                if (loggingMode === 'trace') {
                                    logger.trace({'stage': 'RESPONSE OUT', 'serviceName': className, 'functionName' : property, 'returns' : result});
                                } else if (loggingMode === 'debug') {
                                    logger.debug({'stage': 'RESPONSE OUT', 'serviceName': className, 'functionName' : property});
                                }
                            } else {
                                result = original.apply(this, args);
                            }
                            return result;
                        } catch (error) {
                            // logging the errors / exceptions that are incurred within the method
                            if(error instanceof ErrorResponse) {
                                // handled exceptions
                                logger.error({'stage': 'APPLICATION EXCEPTION', 'serviceName': className,'functionName' : property, 'Error': error});
                            } else {
                                // system exceptions
                                logger.error({'stage': 'SYSTEM EXCEPTION', 'serviceName': className,'functionName' : property, 'Error': error.message, 'stackTrace': error.stack});
                            }
                            throw error;
                        }
                    }
                }
            }
        } catch (error) {
            // const logger = target.constructor.prototype.logger;
            logger.error({'stage': 'SYSTEM EXCEPTION', 'Error': error.message, 'stackTrace': error.stack});
            throw error;
        }
        return descriptor;
    }
}


/**
 * an intermediate function for logging the objects state in a service
 * @param configParams the config params for the logging object. inlcudes loggingmode, logger service instance, sourceName
 * @param params the params that are to be logged
 */
export function logIntermediateObjects(configParams: IntermediateLoggingObjectHeader, params: any) {
    // getting the logger instance reference
    const logger = configParams.logger;
    try {
        // getting the mode of log from the request. By default setting to 'debug' mode
        const loggingMode = configParams.loggingMode || 'trace';
        if (loggingMode !== 'trace') {
            return;
        }
        logger[loggingMode]({'functionName' : configParams.functionName, 'Arguments': params});
    } catch (error) {
        // const logger = configParams.logger;
        logger.error({'stage': 'SYSTEM EXCEPTION', 'functionName' : configParams.functionName, 'Error': error.message, 'stackTrace': error.stack});
        throw error;
    }
}

/**
 * instantiates the logger and assigns to the instance member 'logger'
 * @param param any parameter
 */
export function LoggerInstantiation(param?: any) {
    return function(target) {
        try {
            const loggingMode = param ? param : 'error';
            target.logger = new PinoLogger({pinoHttp:{level:loggingMode}});
            target.loggingMode = loggingMode;
            return target;
        } catch (error) {
            throw Error('Error in instantiating the PinoLogger for @LoggerInstantiation()');
        }
    };
}
