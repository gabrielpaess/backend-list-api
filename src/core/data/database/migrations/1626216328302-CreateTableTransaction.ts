import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableTransaction1626216328302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            length: "200",
            isNullable: true,
          },
          {
            name: "value",
            type: "decimal",
            scale: 2,
            length: "50",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "300",
            isNullable: true,
          },
          {
            name: "id_owner",
            type: "int",
            isNullable: false,
          },
        ],
        // foreignKeys: [
        //   new TableForeignKey({
        //     columnNames: ["id_owner"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "user",
        //   }),
        // ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
