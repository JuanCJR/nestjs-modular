import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
//import { Order } from '../entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@gmail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    };
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users[index] = {
      ...user,
      ...payload,
    };

    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
