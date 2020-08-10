import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Identifiable } from '../../../../shared/entities/identifiable.entitty';
import { UserPermission } from '../../user-permission/entities/user-persmission.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_role')
export class UserRole extends Identifiable {
  @Column('varchar', { length: 200, unique: true, name: 'role_name' })
  name: string;

  @ManyToOne(
    type => User,
    user => user.roles,
  )
  users: User[];

  @ManyToMany(type => UserPermission)
  @JoinTable({ name: 'role_permission' })
  permissions: UserPermission[];
}
