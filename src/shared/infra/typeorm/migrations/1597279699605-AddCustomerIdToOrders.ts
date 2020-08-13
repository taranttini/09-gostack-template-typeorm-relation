import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const ORDERS = 'orders';
const CUSTOMER_ID = 'customer_id';
const FK_ORDER_CUSTOMER = 'OrdersCustomer';

export default class AddCustomerIdToOrders1597279699605
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      ORDERS,
      new TableColumn({
        name: CUSTOMER_ID,
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      ORDERS,
      new TableForeignKey({
        name: FK_ORDER_CUSTOMER,
        columnNames: [CUSTOMER_ID],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(ORDERS, FK_ORDER_CUSTOMER);

    await queryRunner.dropColumn(ORDERS, CUSTOMER_ID);
  }
}
