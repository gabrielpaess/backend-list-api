import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1628271676754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'repeat_password',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: 'Field for confim password',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_users');
  }
}
