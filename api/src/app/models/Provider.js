import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'providers'
      }
    );

    return this;
  }
}

export default Provider;