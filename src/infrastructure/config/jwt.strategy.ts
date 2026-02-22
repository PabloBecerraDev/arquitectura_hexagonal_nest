// src/infrastructure/config/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from './jwt.config';

export interface JwtPayload {
    sub: string;      
    email: string;
    username: string;
}



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.accessToken.secret,
        });
    }

    // Lo que retornes aquí queda disponible en el request como req.user
    async validate(payload: JwtPayload) {
        if (!payload.sub) throw new UnauthorizedException();
        return { userId: payload.sub, email: payload.email, username: payload.username };
    }
}