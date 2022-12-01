import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'modules/user/user.service';
import { PayloadSign } from '../../types/payloadSign.type';
import { CreateUserDto } from '__dto/user.dto';
import { LoginDto } from '__dto/auth.dto';
import { DataSource } from 'typeorm';
import { UserEntity } from 'entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  async register(user: CreateUserDto) {
    const isExist = await this.userService.findByEmail(user.email);
    if (isExist)
      throw new HttpException(
        'email is already existed',
        HttpStatus.BAD_REQUEST,
      );
    await this.userService.create(user);
  }

  async login(payload: PayloadSign) {
    const tokens = await this.createPairTokens(payload);

    return {
      ...tokens,
      user: payload,
    };
  }

  async validateUser(mail: string, pass: string): Promise<PayloadSign | null> {
    const user = await this.userService.findByEmail(mail);
    if (!user) return null;
    const { password, email, isAdmin, id, walletAddress } = user;
    const isValid = await bcrypt.compare(pass, password);

    return isValid
      ? {
          email,
          isAdmin,
          id,
          walletAddress,
        }
      : null;
  }

  private async createPairTokens(payload: PayloadSign) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const refreshToken = this.jwtService.sign(
      { id: payload.id },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );

    await this.userService.updateRefreshToken(refreshToken, payload.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async dataSourceTest() {
    return await this.dataSource
      .createQueryBuilder()
      .from(UserEntity, 'user')
      .select('user.email')
      .addSelect('user.createdDate')
      .getMany();
  }
}
