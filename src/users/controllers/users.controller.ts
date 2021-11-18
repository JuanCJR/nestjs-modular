import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  //Ordenes de compra por usuario
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrderByUser(id);
  }
}
