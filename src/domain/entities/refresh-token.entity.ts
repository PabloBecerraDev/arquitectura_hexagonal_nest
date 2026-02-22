// src/domain/entities/refresh-token.entity.ts
export class RefreshToken {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public token: string,
        public expiresAt: Date,
        public readonly createdAt: Date,
        public revokedAt: Date | null = null,
    ) {}

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    isRevoked(): boolean {
        return this.revokedAt !== null;
    }

    isValid(): boolean {
        return !this.isExpired() && !this.isRevoked();
    }

    revoke(): void {
        this.revokedAt = new Date();
    }
}