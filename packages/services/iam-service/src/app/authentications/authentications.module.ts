import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentications.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { AuthenticationRepository } from './repositories/authentication.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get().jwtConfig.jwtSecret,
        signOptions: { expiresIn: configService.get().jwtConfig.jwtExpiryTime },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService, AuthenticationRepository, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [TypeOrmModule],
})
export class AuthenticationsModule { }
