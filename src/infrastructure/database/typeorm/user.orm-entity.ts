// infrastructure/database/typeorm/user.orm-entity.ts
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
    @PrimaryColumn()
    id: string;

    @Column({unique: true, nullable:true})
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}