import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PasswordHasherPort } from 'src/domain/ports/outbound/password-hasher.port';

@Injectable()
export class Argon2PasswordHasherRepository implements PasswordHasherPort {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id, 
      memoryCost: 2 ** 16,   
      timeCost: 3,
      parallelism: 1,
    });
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}