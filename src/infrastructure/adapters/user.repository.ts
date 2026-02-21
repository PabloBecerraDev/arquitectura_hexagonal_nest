// infrastructure/adapters/user.repository.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { IUserOutputPort } from '../../domain/ports/outbound/user.output.port';
import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../database/typeorm/user.orm-entity';

export class UserRepository extends GenericRepository<User, UserOrmEntity> implements IUserOutputPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        repository: Repository<UserOrmEntity>
    ) {
        super(repository);
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { username } });
        return user ? this.toDomain(user) : null;
    }

    protected toOrm(user: User): UserOrmEntity {
        const orm = new UserOrmEntity();
        orm.id = user.id;
        orm.email = user.email;
        orm.username = user.username;
        orm.password = user.password;
        return orm;
    }

    protected toDomain(orm: UserOrmEntity): User {
        return new User(orm.id, orm.email,orm.username, orm.password, orm.createdAt);
    }
}