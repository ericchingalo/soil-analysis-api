import {
  CreateDateColumn,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  OneToMany,
} from 'typeorm';
import { SoilAnalysisBaseEntity } from '../../../../shared/entities/soil-analysis.entitty';
import { ParameterResult } from '../../result/entities/parameter-result.entity';

@Entity('soil_parameter')
export class Parameter extends SoilAnalysisBaseEntity {
  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'lastupdated',
    default: () => 'LOCALTIMESTAMP',
  })
  lastupdated: Date;

  @OneToMany(
    type => ParameterResult,
    result => result.parameter,
  )
  result: ParameterResult[];

  @BeforeInsert()
  insertDate() {
    this.lastupdated = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.lastupdated = new Date();
  }
}
