import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormSales from '../../components/Sales/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Sales() {
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
      <Container className="containersale">

        <TitlePage>Lista de Vendas</TitlePage>

        <Painel className="painelsale">
          <CTable
            titles={['#', 'Total', 'Vendedor']}
            values={sales}
            indexes={['id', 'total', 'salesman.name']}
            indexesSearch={['salesman.name']}
            load={getSales}
            FormCustom={FormSales}
            actionDelete='/sales'
          />
        </Painel>

      </Container>
    </Page>
  );
}