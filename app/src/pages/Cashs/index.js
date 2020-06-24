import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import CHeader from '../../components/CHeader';
import CTable from '../../components/CTable';

import FormCashs from '../../components/Cashs/Form';

import { Page } from './styles';
import { Container, TitlePage, Painel } from '../../styles/scglobal';

export default function Cashs() {
  const [cashs, setCashs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCashs();
    getTotal();
  }, []);
  
  const getTotal = async () => {
    const response = (await api.get('/cashs/total')).data;

    setTotal(response.total);
  };

  const getCashs = async () => {
    const response = (await api.get('/cashs')).data;

    response.map(item => {
      var aux = item;
      aux.method = (item.method === 'add') ? 'Crédito' : 'Débito';
      return aux;
    });

    setCashs(response);
  };

  return (
    <Page>
      <CHeader />
      <Container className="containercash">

        <TitlePage>Controle do Caixa</TitlePage>

        <Painel className="painelcash">

          <CTable
            titles={['#', 'Transação', 'Valor', 'Total']}
            values={cashs}
            indexesSearch={['method']}
            indexes={['id', 'method', 'value', 'total']}
            load={getCashs}
            FormCustom={FormCashs}
            actionDelete='/cashs'
          />

          <div className='total'>
            <span>
              <b>Total:</b>
              R$ {total}
            </span>
          </div>
        </Painel>

      </Container>
    </Page>
  );
}
