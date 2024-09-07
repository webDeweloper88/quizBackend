import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Role } from '../models/role.enum';


export class UpdateUserDto {
  
  @ApiProperty({ example: 'user@example.com', description: 'Новый email пользователя', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'newUsername', description: 'Новое имя пользователя', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'USER', description: 'Новая роль пользователя', required: false })
  @IsString()
  @IsOptional()
  role?: Role;

  @ApiProperty({ example: true, description: 'Статус активации пользователя', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: true, description: 'Подтвержден ли email пользователя', required: false })
  @IsBoolean()
  @IsOptional()
  isEmailConfirmed?: boolean;
}
