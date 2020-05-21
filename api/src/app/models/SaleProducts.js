import Sequelize, { Model } from 'sequelize';

class SaleProducts extends Model {
  static init(sequelize) {
    super.init(
      {
        id_sale: Sequelize.INTEGER,
        id_product: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'sales_has_products'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'id_sale', as: 'sale' });
    this.belongsTo(models.Product, { foreignKey: 'id_product', as: 'product' });
  }
}
export default SaleProducts;