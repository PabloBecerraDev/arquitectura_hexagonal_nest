// application/commands/delete-user/delete-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { IUserOutputPort } from '../../../domain/ports/outbound/user.output.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        @Inject('IUserOutputPort')
        private readonly userOutputPort: IUserOutputPort
    ) {}

    async execute(command: DeleteUserCommand): Promise<void> {
        const user = await this.userOutputPort.findById(command.id);
        if (!user) throw new NotFoundException(`User ${command.id} not found`);

        await this.userOutputPort.delete(command.id);
    }
}