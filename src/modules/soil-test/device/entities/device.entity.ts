import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Identifiable } from '../../../../shared/entities/identifiable.entitty';
import { User } from '../../../system/user/entities/user.entity';
import { Result } from 'src/modules/soil-test/result/entities/result.entity';

@Entity('device')
export class Device extends Identifiable {
  @OneToOne(type => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @OneToMany(
    type => Result,
    result => result.device,
  )
  results: Result[];
}
