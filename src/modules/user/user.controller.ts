import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@decarators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';
import { Role } from './models/role.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';



@ApiTags('Users') // Тег для Swagger
@Controller('users')
@UseGuards(RolesGuard) // Применяем Guard ко всем методам контроллера
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получение всех пользователей (только для администраторов)' })
  @ApiResponse({ status: 200, type: [ResponseUserDto] })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение информации о пользователе по ID' })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  findUserById(@Param('id') id: string) {
    return this.userService.publicUser(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создание нового пользователя (только для администраторов)' })
  @ApiResponse({ status: 201, type: ResponseUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновление данных пользователя (для администраторов)' })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удаление пользователя (только для администраторов)' })
  @ApiResponse({ status: 200 })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
