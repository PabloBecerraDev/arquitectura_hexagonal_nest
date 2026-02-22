// src/infrastructure/adapters/refresh-token.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
import { RefreshTokenRepositoryPort } from '../../domain/ports/outbound/refresh-token.repository.port';
import { RefreshToken } from '@domain/entities/refresh-token.entity';
import { RefreshTokenOrmEntity } from '../database/typeorm/refresh-token.orm-entity';

@Injectable()
export class RefreshTokenRepository implements RefreshTokenRepositoryPort {

    constructor(
        @InjectRepository(RefreshTokenOrmEntity)
        private readonly repo: Repository<RefreshTokenOrmEntity>,
    ) {}

    async save(token: RefreshToken): Promise<RefreshToken> {
        await this.repo.save({
            id: token.id,
            userId: token.userId,
            token: token.token,
            expiresAt: token.expiresAt,
            revokedAt: token.revokedAt,
            createdAt: token.createdAt,
        });
        return token;
    }

    async findByToken(token: string): Promise<RefreshToken | null> {
        const record = await this.repo.findOne({ where: { token } });
        if (!record) return null;

        return new RefreshToken(
            record.id,
            record.userId,
            record.token,
            record.expiresAt,
            record.createdAt,
            record.revokedAt,
        );
    }

    async revokeAllForUser(userId: string): Promise<void> {
        await this.repo.update(
            { userId, revokedAt: IsNull() },
            { revokedAt: new Date() }
        );
    }
}