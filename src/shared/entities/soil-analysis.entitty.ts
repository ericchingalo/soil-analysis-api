import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export class SoilAnalysisBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
