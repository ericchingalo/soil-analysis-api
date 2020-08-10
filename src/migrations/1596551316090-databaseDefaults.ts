import { MigrationInterface, QueryRunner } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { generateBasicAuthanticationString } from 'src/modules/system/user/helpers/basic-auth-token.helper';

export class databaseDefaults1596551316090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_role(role_name) VALUES ('admin'), ('tester'), ('guest');`,
    );
    await queryRunner.query(
      `INSERT INTO user_permission(permission) VALUES ('manage users'), ('add soil data'), ('view soil results');`,
    );

    const adminRole = await queryRunner.query(
      `SELECT id FROM user_role WHERE role_name = 'admin'`,
    );
    const guestRole = await queryRunner.query(
      `SELECT id FROM user_role WHERE role_name = 'guest'`,
    );
    const testerRole = await queryRunner.query(
      `SELECT id FROM user_role WHERE role_name = 'tester'`,
    );

    const permission1 = await queryRunner.query(
      `SELECT id FROM user_permission WHERE permission = 'manage users'`,
    );
    const permission2 = await queryRunner.query(
      `SELECT id FROM user_permission WHERE permission = 'add soil data'`,
    );
    const permission3 = await queryRunner.query(
      `SELECT id FROM user_permission WHERE permission = 'view soil results'`,
    );

    await queryRunner.query(
      `INSERT INTO role_permission VALUES ('${adminRole[0].id}','${permission1[0].id}'), ('${adminRole[0].id}','${permission3[0].id}'), ('${guestRole[0].id}','${permission3[0].id}'), ('${testerRole[0].id}','${permission3[0].id}'), ('${testerRole[0].id}','${permission2[0].id}')`,
    );

    await queryRunner.query(`
    INSERT INTO users (username, password, email, token) VALUES ('Admin', '${await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10,
    )}', 'echingalo@gmail.com', '${generateBasicAuthanticationString(
      'Admin',
      process.env.ADMIN_PASSWORD,
    )}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
