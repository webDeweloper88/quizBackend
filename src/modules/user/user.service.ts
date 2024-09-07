import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AppError } from '@common/constants/errors';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException(AppError.USER_EXIST);
    }
  
    const user = await this.userRepository.create({
      email: dto.email,
      username: dto.username,
      password: dto.password,
      role: Role.ADMIN,
    });
  
    const userResponse: ResponseUserDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      isActive: user.isActive,
    };
    return userResponse;
  }

  async findAllUsers(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      isActive: user.isActive,
    }));
  }
  async findUserById(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(AppError.USER_NOT_EXIST);
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      isActive: user.isActive,
    };
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(AppError.USER_NOT_EXIST);
    }
  
    user.isActive = false;
    await user.save();
  }
  

}