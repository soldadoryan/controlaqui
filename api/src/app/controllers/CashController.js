import Cash from '../models/Salesman';

class CashController {
  async store(req, res) {
    const { method, value, total, id_sales} = req.body;

    const response = await Cash.create({
      method,
      value,
      total,
      id_sales
    });

    return res.status(200).json({
      message: 'Caixa cadastrado com sucesso!',
      cash: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Cash.findAll();

    return res.status(200).json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { method, value, total, id_sales } = req.body;
    
    const cash = await Cash.findByPk(id);

    const response = await cash.update({
      method, 
      value,
      total,
      id_sales
    });

    return res.status(200).json({
      message: 'Caixa atualizado com sucesso!',
      cash: response,
      success: true,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const listId = id.split(',');

    listId.map(async id => {
      await Cash.destroy({ where: { id } });
    });

    return res.json({
      message: 'Caixa(s) deletado(s) com sucesso!',
      success: true,
    });
  }
}

export default new CashController();