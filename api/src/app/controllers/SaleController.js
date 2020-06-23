import Sale from '../models/Sale';
import Salesman from '../models/Salesman';

class SaleController {
  async store(req, res) {
    const { total, id_salesman } = req.body;

    const response = await Sale.create({
      total,
      id_salesman
    });

    return res.status(200).json({
      message: 'Venda cadastrada com sucesso!',
      sale: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Sale.findAll({
      where: { id_salesman },
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