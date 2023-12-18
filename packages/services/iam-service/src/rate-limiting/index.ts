import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";


@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ttl: configService.get('rateLimiting').ttl,
                limit: configService.get('rateLimiting').limit,
            }),
        }),
    ],
})
export class RateLimitingModule { }