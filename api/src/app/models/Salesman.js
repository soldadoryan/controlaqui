import Sequelize, { Model } from 'sequelize';

class Salesman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'salesmans'
      }
    );

    return this;
  }
}

export default Salesman;