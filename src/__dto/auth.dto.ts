import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'thoanh@yahoo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'yenem' })
  @IsString()
  password: string;
}
