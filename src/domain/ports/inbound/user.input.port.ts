// domain/ports/inbound/user.input.port.ts
import { User } from '../../entities/user.entity';

export interface IUserInputPort {
    createUser(id: string, username: string, password: string, createdAt: Date): Promise<User>;
    getUserById(id: string): Promise<User>;
    updateUsername(id: string, newUsername: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
}