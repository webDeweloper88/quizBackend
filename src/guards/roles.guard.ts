import { AppError } from '@common/constants/errors';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем роли, которые заданы декоратором
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!requiredRoles) {
      return true; // Если роли не указаны, доступ открыт для всех
    }

    // Получаем пользователя из запроса
    const { user } = context.switchToHttp().getRequest();

    // Проверяем, есть ли у пользователя нужная роль
    if (!user || !requiredRoles.some((role) => user.role === role)) {
      throw new Error(AppError.PERMISSION_DENIED); // Если роли не совпадают, кидаем исключение
    }

    return true;
  }
}
