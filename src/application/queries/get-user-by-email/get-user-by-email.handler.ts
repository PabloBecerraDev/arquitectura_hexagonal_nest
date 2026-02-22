// src/application/queries/get-user-by-email/get-user-by-email.handler.ts

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { IUserOutputPort, USER_OUTPUT_PORT } from '../../../domain/ports/outbound/user.output.port';
import { User } from '../../../domain/entities/user.entity';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject(USER_OUTPUT_PORT)
    private readonly userOutputPort: IUserOutputPort,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const user = await this.userOutputPort.findByEmail(query.email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${query.email} not found`,
      );
    }

    return user;
  }
}