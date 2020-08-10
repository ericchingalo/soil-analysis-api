import { PrimaryGeneratedColumn, ManyToOne, Entity, Column } from 'typeorm';
import { Result } from './result.entity';
import { Parameter } from '../../parameter/entites/parameter.entity';

@Entity('parameter_result')
export class ParameterResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    type => Result,
    result => result.parameter,
    { onDelete: 'CASCADE' },
  )
  result: Result;

  @ManyToOne(
    type => Parameter,
    parameter => parameter.result,
    { onDelete: 'SET NULL' },
  )
  parameter: Parameter;

  @Column('float', { name: 'value', nullable: false })
  value: number;
}
