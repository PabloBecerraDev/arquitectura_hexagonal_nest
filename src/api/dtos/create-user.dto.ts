// src/api/dtos/create-user.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;
}