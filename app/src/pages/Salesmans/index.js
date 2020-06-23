import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormSalesmans from '../../components/Salesmans/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Salesmans() {
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
      <Container className="containersalesman">

        <TitlePage>Lista de Vendedores</TitlePage>

        <Painel className="painelsalesman">
          <CTable
            titles={['#', 'Nome', 'Cpf']}
            values={salesmans}
            indexes={['id', 'name', 'cpf']}
            indexesSearch={['name', 'cpf']}
            load={getSalesmans}
            FormCustom={FormSalesmans}
            actionDelete='/salesmans'
          />
        </Painel>

      </Container>
    </Page>
  );
}