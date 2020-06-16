import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormProviders from '../../components/Providers/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Providers() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProviders();
  }, []);

  const getProviders = async () => {
    const response = (await api.get('/providers')).data;

    setProviders(response);
  };

  return (
    <Page>
      <CHeader />
      <Container className="containerprovider">

        <TitlePage>Lista de Fornecedores</TitlePage>

        <Painel className="painelprovider">
          <CTable
            titles={['#', 'Nome', 'CNPJ', 'Telefone', 'Endereço']}
            values={providers}
            indexes={['id', 'name', 'cnpj', 'phone', 'address']}
            indexesSearch={['name', 'cnpj']}
            load={getProviders}
            FormCustom={FormProviders}
            actionDelete='/providers'
          />
        </Painel>

      </Container>
    </Page>
  );
}
