// application/queries/get-all-users/get-all-users.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllUsersQuery } from './get-all-users.query';
import { IUserOutputPort, USER_OUTPUT_PORT } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        @Inject(USER_OUTPUT_PORT)
        private readonly userOutputPort: IUserOutputPort
    ) {}

    async execute(): Promise<User[]> {
        return this.userOutputPort.findAll();
    }
}