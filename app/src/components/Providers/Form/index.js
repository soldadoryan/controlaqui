import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CSelect from '../../CSelect';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  useEffect(() => {
    setName(item.name);
    setCnpj(item.cnpj);
    setPhone(item.phone);
    setAddress(item.address);
  }, [item]);

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/providers/${item.id}`, {
        name,
        cnpj,
        phone,
        address
      })).data;
    } else {
      response = (await api.post('/providers', {
        name,
        cnpj,
        phone,
        address
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
      <CInput val={name} required={true} change={e => setName(e)} type='text' label='Nome' />
      <CInput val={cnpj} required={true} change={e => setCnpj(e)} type='text' label='CNPJ' mask='99.999.999.9999-99' />
      <CInput val={phone} required={true} change={e => setPhone(e)} type='text' label='Telefone' mask='(99) 99999-9999' />
      <CInput val={address} required={true} change={e => setAddress(e)} type='text' label='Endereço' />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}
