import { Entity, Column } from 'typeorm';
import { Identifiable } from '../../../../shared/entities/identifiable.entitty';

@Entity('user_permission')
export class UserPermission extends Identifiable {
  @Column('text', { name: 'permission', nullable: false, unique: true })
  permission: string;
}
