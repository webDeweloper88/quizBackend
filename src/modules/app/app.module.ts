import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configurations from '@config/configurations'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '@modules/auth/auth.module'
import { UserModule } from '@modules/user/user.module'
import { User } from '@modules/user/models/user.model'
import { Token } from '@modules/token/models/token.model'
import { AuthMiddleware } from 'src/middleware/auth.middleware'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get<string>('db.POSTGRES_HOST'),
                port: configService.get<number>('db.POSTGRES_PORT'),
                username: configService.get<string>('db.POSTGRES_USER'),
                password: configService.get<string>('db.POSTGRES_PASSWORD'),
                database: configService.get<string>('db.POSTGRES_DB'),
                autoLoadModels: true, // Автоматически загружает модели
                synchronize: true, // Синхронизация моделей с базой (в продакшене лучше false)
                models: [User, Token], // Укажи модели здесь
            }),
        }),

        AuthModule,
        UserModule,
        JwtModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthMiddleware],
})
export class AppModule {
    onfigure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'auth/signup', method: RequestMethod.POST }, // Исключаем маршрут регистрации
                { path: 'auth/signin', method: RequestMethod.POST }, // Исключаем маршрут логина
                { path: 'auth/refresh', method: RequestMethod.POST }, // Исключаем маршрут обновления токенов
                { path: 'auth/confirm-email', method: RequestMethod.POST }, // Исключаем подтверждение email
                {
                    path: 'auth/resend-confirmation',
                    method: RequestMethod.POST,
                }, // Исключаем повторную отправку подтверждения
                { path: 'auth/logout', method: RequestMethod.POST } // Исключаем маршрут выхода
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL }) // Применяем middleware ко всем маршрутам
    }
}
