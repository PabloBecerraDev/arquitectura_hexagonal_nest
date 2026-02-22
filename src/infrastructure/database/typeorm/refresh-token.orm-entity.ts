// src/infrastructure/database/refresh-token.orm-entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity'; 

@Entity('refresh_tokens')
export class RefreshTokenOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ unique: true })
    token: string;

    @Column()
    expiresAt: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    revokedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
    user: UserOrmEntity;
}