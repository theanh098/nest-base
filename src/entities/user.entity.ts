import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Base } from './_base._entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ unique: true, nullable: true })
  walletAddress: string;

  @Column({ nullable: true })
  refreshToken: string;

  @BeforeInsert()
  async hasgPassword() {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
  }
}
