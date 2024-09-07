import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { AtStrategy, RtStrategy } from './strategy'
import { UserModule } from '@modules/user/user.module'
import { TokenModule } from '@modules/token/token.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '@config/jwt.config'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        TokenModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: jwtConfig,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
