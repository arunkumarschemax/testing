import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinoLogger } from 'nestjs-pino';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    logger = new PinoLogger({pinoHttp: {level: 'info'}});
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const {body} = request;
        const loggingObject = {
            requestData: body,
            responseData: ''
        };
        return next
            .handle()
            .pipe(
            tap((data) =>  {
                // loggingObject.responseData = data;
                this.logger.info(loggingObject);
            }),
        );
    }
}
