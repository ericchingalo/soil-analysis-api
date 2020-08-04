import { SoilAnalysisBaseEntity } from './soil-analysis.entitty';
import {
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export class Identifiable extends SoilAnalysisBaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created',
    default: () => 'LOCALTIMESTAMP',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'lastupdated',
    default: () => 'LOCALTIMESTAMP',
  })
  lastUpdated: Date;

  @BeforeInsert()
  insertDates() {
    this.lastUpdated = new Date();
    this.created = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.lastUpdated = new Date();
  }
}
