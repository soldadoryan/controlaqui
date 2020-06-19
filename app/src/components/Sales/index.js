import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [total, setTotal] = useState('');
  const [idSalesman, setIdSalesman] = useState('');


  useEffect(() => {
    setName(item.total);
    setCnpj(item.idSalesman);
  }, [item]);

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/sales/${item.id}`, {
        total,
        idSalesman,
      })).data;
    } else {
      response = (await api.post('/sales', {
        total,
        idSalesman,
      })).data;
    }

    if (response.success) {
      toast.success(response.message);
      success();
      close();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <WrapForm onSubmit={submitForm}>
      <h2>{`${(item.id) ? 'Edição' : 'Cadastro'} de fornecedor`}</h2>
      <CInput val={name} required={true} change={e => setTotal(e)} type='text' label='Nome' />
      <CInput val={cnpj} required={true} change={e => setIdSalesman(e)} type='text' label='CNPJ' />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}