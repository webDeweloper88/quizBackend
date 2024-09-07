import { User } from '@modules/user/models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';


@Table({ tableName: 'tokens' })
export class Token extends Model<Token> {
  
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор токена' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'some_refresh_token', description: 'Refresh токен' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken: string;

  @ApiProperty({ example: '2024-09-10T12:00:00Z', description: 'Дата истечения срока действия refresh токена' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expiresAtRefreshToken: Date;

  @ApiProperty({ example: 'some_password_reset_token', description: 'Токен для сброса пароля' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  passwordResetToken: string;

  @ApiProperty({ example: '2024-09-10T12:00:00Z', description: 'Дата истечения срока действия токена для сброса пароля' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  passwordResetExpires: Date;

  @ApiProperty({ example: 'some_email_confirmation_token', description: 'Токен для подтверждения email' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emailConfirmationToken: string;

  @ApiProperty({ example: '2024-09-10T12:00:00Z', description: 'Дата истечения срока действия токена для подтверждения email' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  emailConfirmationExpires: Date;

  @ForeignKey(() => User)
  @ApiProperty({ example: '1', description: 'ID пользователя, связанного с токеном' })
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
}
