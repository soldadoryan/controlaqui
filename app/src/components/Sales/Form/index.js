import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CSelect from '../../CSelect';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [total, setTotal] = useState('');
  const [idSalesman, setIdSalesman] = useState('');
  const [salesmans, setSalesmans] = useState([]);

  useEffect(() => {
    setTotal(item.total);
    setIdSalesman(item.id_salesman);
    getSalesmans();
  }, [item]);

  const getSalesmans = async () => {
    const response = (await api.get('/salesmans')).data;

    setSalesmans(response);
  };

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/sales/${item.id}`, {
        total,
        id_salesman: idSalesman,
      })).data;
    } else {
      response = (await api.post('/sales', {
        total,
        id_salesman: idSalesman,
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
      <h2>{`${(item.id) ? 'Edição' : 'Cadastro'} de Venda`}</h2>
      {/* <CInput val={total} required={true} change={e => setTotal(e)} type='text' label='Total' /> */}
      <CSelect label='Vendendor' val={idSalesman} change={e => setIdSalesman(e)} required={true} items={salesmans} />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}