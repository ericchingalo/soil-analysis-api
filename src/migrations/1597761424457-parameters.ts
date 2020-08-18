import { MigrationInterface, QueryRunner } from 'typeorm';

export class parameters1597761424457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO soil_parameter(name) VALUES ('pH'), ('moisture'), ('temperature');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
