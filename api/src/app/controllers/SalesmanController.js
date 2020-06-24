import Salesman from '../models/Salesman';

class SalesmanController {
  async store(req, res) {
    const { name, cpf, password } = req.body;

    const response = await Salesman.create({
      name,
      cpf,
      password
    });

    return res.status(200).json({
      message: 'Vendedor cadastrado com sucesso!',
      salesman: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Salesman.findAll();

    return res.status(200).json(response);
  }

  async login(req, res) {
    const { cpf, password } = req.body;

    const salesman = await Salesman.findOne({
      attributes: ['name', 'cpf'],
      where: {
        cpf,
        password
      }
    });
    if (salesman) {
      return res.json({ success: true, salesman })
    } else {
      return res.json({ success: false })
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, cpf, password } = req.body;

    const salesman = await Salesman.findByPk(id);

    const response = await salesman.update({
      name,
      cpf,
      password
    });

    return res.status(200).json({
      message: 'Vendedor atualizado com sucesso!',
      salesman: response,
      success: true,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const listId = id.split(',');

    listId.map(async id => {
      await Salesman.destroy({ where: { id } });
    });

    return res.json({
      message: 'Vendedor(es) deletado(s) com sucesso!',
      success: true,
    });
  }
}

export default new SalesmanController();