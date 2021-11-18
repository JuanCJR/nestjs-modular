import {IsNumber, IsNotEmpty, IsString, IsEmail, IsPositive} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
