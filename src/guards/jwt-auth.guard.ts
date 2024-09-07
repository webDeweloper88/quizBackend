import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // Используем стратегию 'jwt' для проверки токена

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {} // Guard для Refresh Token
