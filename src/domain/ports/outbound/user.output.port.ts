import { User } from '../../entities/user.entity';

export interface IUserOutputPort {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}

export const USER_OUTPUT_PORT = 'USER_OUTPUT_PORT';
