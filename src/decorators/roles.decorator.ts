import { SetMetadata } from '@nestjs/common';

// Декоратор для указания ролей
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
