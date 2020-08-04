import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { generateBasicAuthanticationString } from 'src/modules/system/user/helpers/basic-auth-token.helper';
import { passwordHash } from 'src/modules/system/user/helpers/password-hash.helper';

export class User1595337531724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = await queryRunner.query(`
    INSERT INTO users (username, password, email, token) VALUES ('admin', '${await bcrypt.hash(
      'chingalo',
      10,
    )}', 'echingalo@gmail.com', '${generateBasicAuthanticationString(
      'admin',
      'chingalo',
    )}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
