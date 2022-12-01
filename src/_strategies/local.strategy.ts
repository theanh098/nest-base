import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '__dto/auth.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginDto = plainToInstance(LoginDto, {
      email,
      password,
    });

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      const message = errors.map(error => JSON.stringify(error.constraints));
      throw new BadRequestException(message);
    }

    return await this.authService.validateUser(email, password);
  }
}
