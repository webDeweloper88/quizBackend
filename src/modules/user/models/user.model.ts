import { Token } from '@modules/token/models/token.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';


export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
@Table({ tableName: 'users' })
export class User extends Model<User> {
  
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'user123', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({ example: 'USER', description: 'Роль пользователя (USER или ADMIN)' })
  @Column({
    type: DataType.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: Role.USER,
  })
  role: Role;

  @ApiProperty({ example: true, description: 'Подтвержден ли email пользователя' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isEmailConfirmed: boolean;

  @ApiProperty({ example: 'hashed_password', description: 'Хешированный пароль пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: true, description: 'Статус активности пользователя' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @ApiProperty({ example: 0, description: 'Количество неудачных попыток подтверждения email' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  failedConfirmationAttempts: number;

  @ApiProperty({ example: null, description: 'Дата последнего запроса на подтверждение email' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastConfirmationRequest: Date;

  @ApiProperty({ example: false, description: 'Заблокирован ли пользователь' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBlocked: boolean;

  @ApiProperty({ example: null, description: 'Время до которого пользователь заблокирован' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  blockUntil: Date;

  @ApiProperty({ example: 'en', description: 'Предпочитаемый язык интерфейса' })
  @Column({
    type: DataType.STRING,
    defaultValue: 'en',
  })
  locale: string;

  @HasMany(() => Token)
tokens: Token[];
}
