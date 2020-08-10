import {
  Entity,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Identifiable } from '../../../../shared/entities/identifiable.entitty';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ManyToOne } from 'typeorm';

@Entity('users')
export class User extends Identifiable {
  @Column('text', { name: 'username', unique: true, nullable: false })
  username: string;

  @Column('text', { select: false, nullable: false })
  password: string;

  @Column('text', { name: 'email', nullable: false })
  email: string;

  @Column('text', { name: 'region', nullable: true })
  region: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    select: false,
  })
  token: string;

  @ManyToOne(
    type => UserRole,
    role => role.users,

    { onDelete: 'SET NULL' },
  )
  roles: UserRole;

  public static getBase64(username: string, password: string) {
    return Buffer.from(username + ':' + password).toString('base64');
  }

  public static async authenticateUserByToken(token: string): Promise<User> {
    try {
      let user: User;
      user = await User.findOne({
        where: { token },
      });
      if (user) {
        delete user.token;
        return user;
      } else {
        throw new HttpException(
          'Incorrect username/password',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        'Incorrect username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @BeforeInsert()
  async createToken() {
    this.token = await User.getBase64(this.username, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async updateToken() {
    this.token = await User.getBase64(this.username, this.password);
  }
}
