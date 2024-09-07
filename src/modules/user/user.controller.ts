import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@decarators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';
import { Role } from './models/role.enum';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN) // Доступ только для админов
  @UseGuards(RolesGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.publicUser(id); // Публичная информация пользователя
  }

  @Post()
  @Roles(Role.ADMIN) // Доступ только для админов
  @UseGuards(RolesGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN) // Доступ для админов или самого пользователя
  @UseGuards(RolesGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN) // Доступ только для админов
  @UseGuards(RolesGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
