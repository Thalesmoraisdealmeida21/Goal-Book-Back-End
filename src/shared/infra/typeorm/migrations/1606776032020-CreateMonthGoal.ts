import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMonthGoal1606776032020
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'monthGoals',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'goalId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'pages',
            type: 'integer',
            isNullable: true,
          },

          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'idGoogle',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'month',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'status',
            type: 'boolean',
            isNullable: true,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'monthGoals',
      new TableForeignKey({
        columnNames: ['goalId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'goals',
        name: 'goalFK',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('monthGoals');
  }
}
