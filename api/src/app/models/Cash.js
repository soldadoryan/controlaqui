import Sequelize, { Model } from 'sequelize';

class Cash extends Model {
  static init(sequelize) {
    super.init(
      {
        method: Sequelize.STRING,
        value: Sequelize.DOUBLE,
        total: Sequelize.DOUBLE,
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
    this.belongsTo(models.Sale, { foreignKey: 'id_sales', as: 'sale' });
  }
}
export default Cash;