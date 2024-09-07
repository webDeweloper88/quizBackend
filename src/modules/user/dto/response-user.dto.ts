import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../models/user.model';


export class ResponseUserDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  email: string;

  @ApiProperty({ example: 'user123', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: 'USER', description: 'Роль пользователя' })
  role: Role;

  @ApiProperty({ example: true, description: 'Подтвержден ли email пользователя' })
  isEmailConfirmed: boolean;

  @ApiProperty({ example: true, description: 'Активен ли пользователь' })
  isActive: boolean;
}
