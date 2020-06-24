import Sale from '../models/Sale';
import Cash from '../models/Cash';
import SaleHasProduct from '../models/SaleHasProduct';
import Salesman from '../models/Salesman';
import Product from '../models/Product';
import { literal } from 'sequelize';

class SaleController {
  async store(req, res) {
    const { total, products, id_salesman } = req.body;


    const response = await Sale.create({
      total,
      id_salesman
    });

    products.map(async id => {
      await SaleHasProduct.create({
        id_sale: response.getDataValue('id'),
        id_product: parseInt(id),
      });

      await Product.update({ quantity: literal('quantity - 1') }, { where: { id } });
    });

    const transacaoAtual = await Cash.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    var valorAtual = (transacaoAtual.length > 0) ? transacaoAtual[0].total : 0;

    valorAtual = parseFloat(valorAtual) + parseFloat(total);

    await Cash.create({
      method: 'add',
      value: total,
      total: valorAtual,
    });

    return res.status(200).json({
      message: 'Venda cadastrada com sucesso!',
      sale: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Sale.findAll({
      raw: true,
      include: [
        { model: Salesman, as: 'salesman' }
      ]
    });

    return res.status(200).json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { total, id_salesman } = req.body;

    const sale = await Sale.findByPk(id);

    const response = await sale.update({
      total,
      id_salesman
    });

    return res.status(200).json({
      message: 'Venda atualizada com sucesso!',
      sale: response,
      success: true,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const listId = id.split(',');

    listId.map(async id => {
      await Sale.destroy({ where: { id } });
    });

    return res.json({
      message: 'Venda(s) deletada(s) com sucesso!',
      success: true,
    });
  }
}

export default new SaleController();