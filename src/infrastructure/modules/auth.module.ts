// src/modules/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@api/controllers/auth.controller';
import { AuthService } from '@application/services/auth.service';
import { JwtStrategy } from '@infrastructure/config/jwt.strategy';
import { RefreshTokenRepository } from '@infrastructure/adapters/refresh-token.repository';
import { RefreshTokenOrmEntity } from '@infrastructure/database/typeorm/refresh-token.orm-entity';

import { UserModule } from './user.module';

@Module({
    imports: [
        UserModule,               
        PassportModule,
        JwtModule.register({}),   
        TypeOrmModule.forFeature([RefreshTokenOrmEntity]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: 'REFRESH_TOKEN_PORT',
            useClass: RefreshTokenRepository,
        },
    ],
})
export class AuthModule {}