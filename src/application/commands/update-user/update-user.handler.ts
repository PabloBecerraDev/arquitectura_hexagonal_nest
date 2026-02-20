// application/commands/update-user/update-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import { IUserOutputPort } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @Inject('IUserOutputPort')
        private readonly userOutputPort: IUserOutputPort
    ) {}

    async execute(command: UpdateUserCommand): Promise<User> {
        const user = await this.userOutputPort.findById(command.id);
        if (!user) throw new NotFoundException(`User ${command.id} not found`);

        user.updateUsername(command.username);
        return this.userOutputPort.update(user);
    }
}