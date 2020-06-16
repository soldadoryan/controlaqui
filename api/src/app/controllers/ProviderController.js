import Provider from '../models/Provider';

class ProviderController {
  async store(req, res) {
    const { name, cnpj, phone, address } = req.body;

    const response = await Provider.create({
      name,
      cnpj,
      phone,
      address
    });

    return res.status(200).json({
      message: 'Fornecedor cadastrado com sucesso!',
      provider: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Provider.findAll();

    return res.status(200).json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, cnpj, phone, address } = req.body;

    const provider = await Provider.findByPk(id);

    const response = await provider.update({
      name,
      cnpj,
      phone,
      address
    });

    return res.status(200).json({
      message: 'Fornecedor atualizado com sucesso!',
      provider: response,
      success: true,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const listId = id.split(',');

    listId.map(async id => {
      await Provider.destroy({ where: { id } });
    });

    return res.json({
      message: 'Fornecedor(es) deletado(s) com sucesso!',
      success: true,
    });
  }
}

export default new ProviderController();