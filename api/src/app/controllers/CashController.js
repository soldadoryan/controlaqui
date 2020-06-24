import Cash from '../models/Cash';

class CashController {
  async store(req, res) {
    const { method, value} = req.body;

    console.log(method);

    const transacaoAtual = await Cash.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    var valorAtual = (transacaoAtual.length > 0) ? transacaoAtual[0].total : 0;

    if(method === 'add') {
      valorAtual = parseFloat(valorAtual) + parseFloat(value);
    } else {
      valorAtual = parseFloat(valorAtual) - parseFloat(value);
    }

    const response = await Cash.create({
      method,
      value,
      total: valorAtual,
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

  async show(req, res) {
    const response = await Cash.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    return res.status(200).json({ total: response[0].total });
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