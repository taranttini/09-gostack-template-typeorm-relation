import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const ORDERS_PRODUCTS = 'orders_products';
const ORDER_ID = 'order_id';
const FK_ORDERS_PRODUCTS_ORDER = 'OrdersProductsOrder';

export default class AddOrderIdToOrdersProducts1597280278857
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      ORDERS_PRODUCTS,
      new TableColumn({
        name: ORDER_ID,
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      ORDERS_PRODUCTS,
      new TableForeignKey({
        name: FK_ORDERS_PRODUCTS_ORDER,
        columnNames: [ORDER_ID],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(ORDERS_PRODUCTS, FK_ORDERS_PRODUCTS_ORDER);

    await queryRunner.dropColumn(ORDERS_PRODUCTS, ORDER_ID);
  }
}
