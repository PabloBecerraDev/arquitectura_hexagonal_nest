import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    
    ssl: {
      rejectUnauthorized: false,
    },
    
    autoLoadEntities: true,
    synchronize: configService.get('NODE_ENV') === 'development',
    migrationsRun: configService.get('NODE_ENV') === 'production',
    migrations: ['dist/migrations/*.js'],
  }),
});