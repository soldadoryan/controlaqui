import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        unity_value: Sequelize.DOUBLE,
        quantity: Sequelize.INTEGER,
        id_providers: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'products'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'id_providers', as: 'provider' });
  }
}
export default Product;