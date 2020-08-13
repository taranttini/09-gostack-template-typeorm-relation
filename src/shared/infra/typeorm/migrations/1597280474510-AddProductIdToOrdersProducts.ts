import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const ORDERS_PRODUCTS = 'orders_products';
const PRODUCT_ID = 'product_id';
const FK_ORDERS_PRODUCTS_PRODUCT = 'OrdersProductsProduct';

export default class AddProductIdToOrdersProducts1597280474510
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      ORDERS_PRODUCTS,
      new TableColumn({
        name: PRODUCT_ID,
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      ORDERS_PRODUCTS,
      new TableForeignKey({
        name: FK_ORDERS_PRODUCTS_PRODUCT,
        columnNames: [PRODUCT_ID],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      ORDERS_PRODUCTS,
      FK_ORDERS_PRODUCTS_PRODUCT,
    );

    await queryRunner.dropColumn(ORDERS_PRODUCTS, PRODUCT_ID);
  }
}
