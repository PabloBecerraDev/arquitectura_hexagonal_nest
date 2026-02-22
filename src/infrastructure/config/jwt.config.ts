// src/infrastructure/config/jwt.config.ts
export const jwtConfig = {
    accessToken: {
        secret: process.env.JWT_ACCESS_SECRET || 'access-secret-change-in-prod',
        expiresIn: 900,        // 15 minutos en segundos
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-in-prod',
        expiresIn: 2592000,    // 30 días en segundos
    },
};