import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        total: Sequelize.DOUBLE,
        id_salesman: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'sales'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Salesman, { foreignKey: 'id_salesman', as: 'salesman' });
  }
}
export default Sale;