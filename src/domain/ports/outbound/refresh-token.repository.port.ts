// src/domain/ports/refresh-token.repository.port.ts
import { RefreshToken } from '@domain/entities/refresh-token.entity';

export interface RefreshTokenRepositoryPort {
    save(token: RefreshToken): Promise<RefreshToken>;
    findByToken(token: string): Promise<RefreshToken | null>;
    revokeAllForUser(userId: string): Promise<void>;
}