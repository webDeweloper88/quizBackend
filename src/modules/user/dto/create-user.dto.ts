import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../models/role.enum';



export class CreateUserDto {
  
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user123', description: 'Имя пользователя' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'USER', description: 'Роль пользователя (USER или ADMIN)' })
  @IsString()
  @IsOptional()
  role?: Role;
}
