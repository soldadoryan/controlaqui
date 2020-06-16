import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        unity_value: Sequelize.DOUBLE,
        quantity: Sequelize.INTEGER,
        id_provider: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'products'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'id_provider', as: 'provider' });
  }
}
export default Product;