import { TokenService } from '@modules/token/token.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { JwtPayload, Tokens } from './types'
import { UserService } from '@modules/user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {}

    // Метод для генерации access и refresh токенов
    async getTokens(userId: string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email,
            userId: String(userId),
            role: 'USER', // Предположим, что роль 'USER', можно поменять на динамическую
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('jwt.JWT_ACCESS_SECRET'),
                expiresIn:
                    this.configService.get<string>(
                        'jwt.JWT_ACCESS_EXPIRES_IN'
                    ) || '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>(
                    'jwt.JWT_REFRESH_SECRET'
                ),
                expiresIn:
                    this.configService.get<string>(
                        'jwt.JWT_REFRESH_EXPIRES_IN'
                    ) || '7d',
            }),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }
    async refreshTokens(userId: string, rt: string): Promise<Tokens> {
        const userTokens = await this.tokenService.findTokenByUserId(userId)

        if (
            !userTokens ||
            !(await bcrypt.compare(rt, userTokens.refreshToken))
        ) {
            throw new ForbiddenException('Invalid refresh token')
        }

        // Получаем email пользователя через UserService или другим способом
        const user = await this.userService.findUserById(userId) // Должен быть метод в UserService для получения пользователя
        if (!user) {
            throw new ForbiddenException('User not found')
        }

        // Генерация новой пары токенов
        const tokens = await this.getTokens(userId, user.email)
        await this.tokenService.updateRefreshToken(userId, tokens.refreshToken) // Обновляем refresh token

        return tokens
    }
}
