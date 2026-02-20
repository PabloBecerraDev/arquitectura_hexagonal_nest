// src/api/dtos/update-user.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;
}