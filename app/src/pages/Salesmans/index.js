import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormProducts from '../../components/Products/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Products() {
  const [salesmans, setSalesmans] = useState([]);

  useEffect(() => {
    getSalesmans();
  }, []);

  const getSalesmans = async () => {
    const response = (await api.get('/salesmans')).data;

    setSalesmans(response);
  };

  return (
    <Page>
      <CHeader />
      <Container className="containerproduct">

        <TitlePage>Lista de Vendedores</TitlePage>

        <Painel className="painelproduct">
          <CTable
            titles={['#', 'Nome', 'Cpf']}
            values={products}
            indexes={['id', 'nome', 'cpf']}
            indexesSearch={['nome', 'cpf']}
            load={getProducts}
            FormCustom={FormProducts}
            actionDelete='/salesmans'
          />
        </Painel>

      </Container>
    </Page>
  );
}