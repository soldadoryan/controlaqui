import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormProducts from '../../components/Products/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = (await api.get('/products')).data;

    setProducts(response);
  };

  return (
    <Page>
      <CHeader />
      <Container className="containerproduct">

        <TitlePage>Lista de Produtos</TitlePage>

        <Painel className="painelproduct">
          <CTable
            titles={['#', 'Descrição', 'Quantidade', 'Valor único', 'Fornecedor']}
            values={products}
            indexes={['id', 'description', 'quantity', 'unity_value', 'provider.name']}
            indexesSearch={['description', 'provider.name']}
            load={getProducts}
            FormCustom={FormProducts}
            actionDelete='/products'
          />
        </Painel>

      </Container>
    </Page>
  );
}
