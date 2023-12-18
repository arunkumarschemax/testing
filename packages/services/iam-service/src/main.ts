import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';
import { createDocument } from './swagger/swagger';
import * as bodyParser from 'body-parser';
import { LoggingInterceptor } from '@finestchoicex-iam/backend-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: true,
  });

  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  app.use(bodyParser.urlencoded({ limit: configService.get().maxPayloadSize, extended: true }));
  app.use(bodyParser.json({ limit: configService.get().maxPayloadSize }));
  app.useGlobalPipes(new ValidationPipe({ validationError: { target: false }, transform: true, forbidUnknownValues: false }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  if (configService.get().env === 'development') {
    createDocument(app);
  }
  const server = await app.listen(configService.get().port);
  server.setTimeout(1000 * configService.get().responseTimeOut);
  Logger.log(`🚀 Application is running on: http://localhost:${configService.get().port}`);
}

bootstrap();
