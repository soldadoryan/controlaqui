import Product from '../models/Product';
import Provider from '../models/Provider';

class ProductController {
  async store(req, res) {
    const { description, unity_value, quantity, id_provider } = req.body;

    const response = await Product.create({
      description,
      unity_value,
      quantity,
      id_provider
    });

    return res.status(200).json({
      message: 'Produto cadastrado com sucesso!',
      Product: response,
      success: true,
    });

  }

  async index(req, res) {
    const response = await Product.findAll({
      raw: true,
      include: [
        { model: Provider, as: 'provider' }
      ]
    });

    return res.status(200).json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { description, unity_value, quantity, id_provider } = req.body;

    const product = await Product.findByPk(id);

    const response = await product.update({
      description,
      unity_value,
      quantity,
      id_provider
    });

    return res.status(200).json({
      message: 'Produto atualizado com sucesso!',
      product: response,
      success: true,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const listId = id.split(',');

    listId.map(async id => {
      await Product.destroy({ where: { id } });
    });

    return res.json({
      message: 'Produto(s) deletado(s) com sucesso!',
      success: true,
    });
  }
}

export default new ProductController();