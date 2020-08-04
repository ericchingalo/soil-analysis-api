import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Identifiable } from '../../../../shared/entities/identifiable.entitty';
import { UserPermission } from '../../user-permission/entities/user-persmission.entity';

@Entity('user_role')
export class UserRole extends Identifiable {
  @Column('varchar', { length: 200, unique: true, name: 'role_name' })
  name: string;

  @ManyToMany(type => UserPermission)
  @JoinTable({ name: 'role_permission' })
  permissions: UserPermission[];
}
