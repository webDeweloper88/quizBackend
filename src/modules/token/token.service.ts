import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Token } from './models/token.model'
import * as bcrypt from 'bcrypt'

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token) private readonly tokenRepository: typeof Token
    ) {}

    async hashToken(token: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(token, salt)
    }

    async updateRefreshToken(
        userId: string,
        refreshToken: string
    ): Promise<void> {
        const hashedRefreshToken = await this.hashToken(refreshToken) // Предположим, токен хешируется
        await this.tokenRepository.update(
            { refreshToken: hashedRefreshToken }, // Обновляем только поле refreshToken
            { where: { userId } }
        )
    }

    async deleteRefreshToken(userId: number): Promise<void> {
        await this.tokenRepository.update(
            { refreshToken: null }, // Устанавливаем null только для refreshToken
            { where: { userId } }
        )
    }
    // Метод для поиска токена по userId
    async findTokenByUserId(userId: string): Promise<Token | null> {
        return this.tokenRepository.findOne({
            where: { userId },
        })
    }
}
