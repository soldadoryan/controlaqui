import Sequelize, { Model } from 'sequelize';

class SaleHasProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        id_sales: Sequelize.INTEGER,
        id_products: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'sales_has_products'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'id_sales', as: 'sale' });
    this.belongsTo(models.Product, { foreignKey: 'id_products', as: 'product' });
  }
}
export default SaleHasProduct;