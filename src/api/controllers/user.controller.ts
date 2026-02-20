// src/api/controllers/user.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserCommand } from '@application/commands/create-user/create-user.command';
import { UpdateUserCommand } from '@application/commands/update-user/update-user.command';
import { DeleteUserCommand } from '@application/commands/delete-user/delete-user.command';
import { GetUserQuery } from '@application/queries/get-user/get-user.query';
import { GetAllUsersQuery } from '@application/queries/get-all-users/get-all-users.query';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.commandBus.execute(
            new CreateUserCommand(uuidv4(), dto.username, dto.password)
        );
    }

    @Get()
    async findAll() {
        return this.queryBus.execute(new GetAllUsersQuery());
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.queryBus.execute(new GetUserQuery(id));
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.commandBus.execute(new UpdateUserCommand(id, dto.username));
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.commandBus.execute(new DeleteUserCommand(id));
    }
}
