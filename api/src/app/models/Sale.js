import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        total: Sequelize.DOUBLE,
        id_salesmans: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'sales'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Salesman, { foreignKey: 'id_salesmans', as: 'salesman' });
  }
}
export default Sale;