import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { UserEntity } from 'entities/user.entity';
import { CreateUserDto } from '__dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
  ) {}

  /* Non controller services */
  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = plainToClass(UserEntity, user);
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async updateRefreshToken(newToken: string, userId: number) {
    return this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        refreshToken: newToken,
      })
      .where('id = :userId', { userId })
      .execute();
  }
}
