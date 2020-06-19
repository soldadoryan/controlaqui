import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormProducts from '../../components/Products/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Products() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const response = (await api.get('/sales')).data;

    setSales(response);
  };

  return (
    <Page>
      <CHeader />
      <Container className="containerproduct">

        <TitlePage>Lista de Vendas</TitlePage>

        <Painel className="painelproduct">
          <CTable
            titles={['#', 'Total', 'Vendedor']}
            values={products}
            indexes={['id', 'total', 'salesman.name']}
            indexesSearch={['total', 'salesman.name']}
            load={getProducts}
            FormCustom={FormProducts}
            actionDelete='/sales'
          />
        </Painel>

      </Container>
    </Page>
  );
}