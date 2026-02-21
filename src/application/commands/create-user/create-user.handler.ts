// application/commands/create-user/create-user.handler.ts

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { IUserOutputPort } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';
import { PASSWORD_HASHER_PORT, PasswordHasherPort } from '../../../domain/ports/outbound/password-hasher.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject('IUserOutputPort')
        private readonly userOutputPort: IUserOutputPort,

        @Inject(PASSWORD_HASHER_PORT)
        private readonly passwordHasher: PasswordHasherPort,  
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {
        const { id, email, username, password, createdAt } = command;

        const hashedPassword = await this.passwordHasher.hash(password);  // <-- hashear

        const user = new User(id, email, username, hashedPassword, createdAt);  // <-- usar hashedPassword
        return this.userOutputPort.save(user);
    }
}