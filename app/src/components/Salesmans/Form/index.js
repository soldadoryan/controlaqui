import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(item.name);
    setCpf(item.cpf);
    setPassword(item.password);
  }, [item]);

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/salesmans/${item.id}`, {
        name,
        cpf,
        password,
      })).data;
    } else {
      response = (await api.post('/salesmans', {
        name,
        cpf,
        password,
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
      <h2>{`${(item.id) ? 'Edição' : 'Cadastro'} de vendedor`}</h2>
      <CInput val={name} required={true} change={e => setName(e)} type='text' label='Nome' />
      <CInput val={cpf} required={true} change={e => setCpf(e)} type='text' label='CPF' />
      <CInput val={password} required={true} change={e => setPassword(e)} type='password' label='Senha' />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}