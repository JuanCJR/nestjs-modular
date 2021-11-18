import {IsNumber, IsNotEmpty, IsString, IsEmail, IsPositive} from 'class-validator';
import { PartialType,ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"the email of user"})
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
