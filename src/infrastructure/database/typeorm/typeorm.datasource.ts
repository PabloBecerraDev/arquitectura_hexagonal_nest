// src/infrastructure/database/typeorm/typeorm.datasource.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserOrmEntity } from './user.orm-entity';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    entities: [UserOrmEntity],
    migrations: ['src/infrastructure/database/migrations/*.ts'],
});