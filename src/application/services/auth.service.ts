import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { IUserOutputPort, USER_OUTPUT_PORT } from '@domain/ports/outbound/user.output.port';
import { RefreshTokenRepositoryPort } from '@domain/ports/outbound/refresh-token.repository.port';
import { RefreshToken } from '@domain/entities/refresh-token.entity';
import { jwtConfig } from '@infrastructure/config/jwt.config';
import { JwtPayload } from '@infrastructure/config/jwt.strategy';
import { PasswordHasherPort, PASSWORD_HASHER_PORT } from '@domain/ports/outbound/password-hasher.port';


@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_OUTPUT_PORT)
        private readonly userRepo: IUserOutputPort,

        @Inject('REFRESH_TOKEN_PORT')
        private readonly refreshTokenRepo: RefreshTokenRepositoryPort,

        private readonly jwtService: JwtService,

        @Inject(PASSWORD_HASHER_PORT)
        private readonly passwordHasher: PasswordHasherPort,
    ) {}
    async login(email: string, password: string) {
        // 1. Buscar usuario
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        // 2. Verificar contraseña
        const isValid = await this.passwordHasher.compare(password, user.password);
        if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

        // 3. Generar tokens
        return this.generateTokens(user.id, user.email, user.username);
    }

    async refresh(refreshTokenValue: string) {
        // 1. Buscar en DB
        const tokenRecord = await this.refreshTokenRepo.findByToken(refreshTokenValue);
        if (!tokenRecord || !tokenRecord.isValid()) {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }

        // 2. Buscar usuario
        const user = await this.userRepo.findById(tokenRecord.userId);
        if (!user) throw new UnauthorizedException();

        // 3. Revocar el token actual (rotation: cada refresh genera uno nuevo)
        tokenRecord.revoke();
        await this.refreshTokenRepo.save(tokenRecord);

        // 4. Generar nuevos tokens
        return this.generateTokens(user.id, user.email, user.username);
    }

    async logout(userId: string) {
        await this.refreshTokenRepo.revokeAllForUser(userId);
    }

    private async generateTokens(userId: string, email: string, username: string) {
        const payload: JwtPayload = { sub: userId, email, username };

        const accessToken = this.jwtService.sign(payload, {
            secret: jwtConfig.accessToken.secret,
            expiresIn: jwtConfig.accessToken.expiresIn,
        });

        const refreshTokenValue = this.jwtService.sign(payload, {
            secret: jwtConfig.refreshToken.secret,
            expiresIn: jwtConfig.refreshToken.expiresIn,
        });

        // Guardar refresh token en DB
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const refreshToken = new RefreshToken(
            uuidv4(),
            userId,
            refreshTokenValue,
            expiresAt,
            new Date(),
        );
        await this.refreshTokenRepo.save(refreshToken);

        return { accessToken, refreshToken: refreshTokenValue };
    }

}