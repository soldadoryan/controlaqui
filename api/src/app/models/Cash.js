import Sequelize, { Model } from 'sequelize';

class Cash extends Model {
  static init(sequelize) {
    super.init(
      {
        method: Sequelize.STRING,
        value: Sequelize.DOUBLE,
        total: Sequelize.INTEGER,
        id_sales: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'cash'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'id_sales', as: 'sale' });
  }
}
export default Product;