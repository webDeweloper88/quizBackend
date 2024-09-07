import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1] // Извлекаем токен из заголовка
            try {
                const user = this.jwtService.verify(token) // Проверяем и декодируем токен
                req.user = user // Добавляем пользователя в запрос
            } catch (error) {
                console.error('Invalid JWT Token:', error.message)
            }
        }
        next() // Продолжаем выполнение запроса
    }
}
