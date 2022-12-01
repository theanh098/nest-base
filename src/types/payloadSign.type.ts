import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from 'entities/user.entity';

export class PayloadSign
  implements Pick<UserEntity, 'email' | 'id' | 'walletAddress' | 'isAdmin'>
{
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  walletAddress: string;

  @IsBoolean()
  isAdmin: boolean;
}
