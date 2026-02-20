import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import { IUserOutputPort } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @Inject('IUserOutputPort')
        private readonly userOutputPort: IUserOutputPort
    ) {}

    async execute(query: GetUserQuery): Promise<User> {
        const user = await this.userOutputPort.findById(query.id);
        if (!user) throw new NotFoundException(`User ${query.id} not found`);
        return user;
    }
}
