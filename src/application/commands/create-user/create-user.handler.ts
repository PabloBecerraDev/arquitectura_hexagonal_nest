// application/commands/create-user/create-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { IUserOutputPort } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject('IUserOutputPort')
        private readonly userOutputPort: IUserOutputPort
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {
        const { id, username, password, createdAt } = command;
        const user = new User(id, username, password, createdAt);
        return this.userOutputPort.save(user);
    }
}