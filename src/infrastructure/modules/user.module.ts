// infrastructure/modules/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../database/typeorm/user.orm-entity';
import { UserRepository } from '../adapters/user.repository';
import { CreateUserHandler } from '../../application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '../../application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '../../application/commands/delete-user/delete-user.handler';
import { GetUserHandler } from '../../application/queries/get-user/get-user.handler';
import { GetUserByEmailHandler } from '../../application/queries/get-user-by-email/get-user-by-email.handler';
import { GetAllUsersHandler } from '../../application/queries/get-all-users/get-all-users.handler';
import { UserController } from '../../api/controllers/user.controller';

import { PASSWORD_HASHER_PORT } from 'src/domain/ports/outbound/password-hasher.port';
import { USER_OUTPUT_PORT } from 'src/domain/ports/outbound/user.output.port';

import { Argon2PasswordHasherRepository } from '../adapters/argon2-password-hasher.repository';


const CommandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];
const QueryHandlers = [ GetAllUsersHandler, GetUserHandler, GetUserByEmailHandler];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserOrmEntity]),
    ],
    controllers: [UserController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        {
            provide: USER_OUTPUT_PORT,
            useClass: UserRepository,
        },
        {
            provide: PASSWORD_HASHER_PORT, 
            useClass: Argon2PasswordHasherRepository,
        },
    ],
    exports: [USER_OUTPUT_PORT, PASSWORD_HASHER_PORT],
})
export class UserModule {}