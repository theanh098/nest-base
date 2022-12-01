import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from '_decorators/auth.decorator';
import { User } from '_decorators/userReq.decorator';
import { AuthGuardLocal } from '_guards/localAuth.guard';
import { LoginDto } from '__dto/auth.dto';
import { CreateUserDto } from '__dto/user.dto';
import { PayloadSign } from '../../types/payloadSign.type';
import { Roles } from '../../types/role.type';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuardLocal)
  async login(@User() payload: PayloadSign) {
    return this.authService.login(payload);
  }

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Get()
  @Auth()
  whoIAm(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: PayloadSign,
  ) {
    return this.authService.dataSourceTest();
  }
}
