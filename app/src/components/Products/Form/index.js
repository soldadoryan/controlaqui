import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CSelect from '../../CSelect';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [description, setDescription] = useState('');
  const [unityValue, setUnityValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [idProvider, setidProvider] = useState('');
  const [providers, setProviders] = useState([]);


  useEffect(() => {
    setDescription(item.description);
    setUnityValue(item.unity_value);
    setQuantity(item.quantity);
    setidProvider(item.id_provider);
    getProviders();
  }, [item]);

  const getProviders = async () => {
    const response = (await api.get('/providers')).data;

    setProviders(response);
  };

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/products/${item.id}`, {
        description,
        unity_value: unityValue,
        quantity,
        id_provider: idProvider
      })).data;
    } else {
      response = (await api.post('/products', {
        description,
        unity_value: unityValue,
        quantity,
        id_provider: idProvider
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
      <h2>{`${(item.id) ? 'Edição' : 'Cadastro'} de produto`}</h2>
      <CInput val={description} required={true} change={e => setDescription(e)} type='text' label='Descrição' />
      <CInput val={unityValue} required={true} change={e => setUnityValue(e)} type='text' label='Valor único' />
      <CInput val={quantity} required={true} change={e => setQuantity(e)} type='number' label='Quantidade' />
      <CSelect label='Fornecedor' indexValue='id' indexLabel='name' val={idProvider} change={e => setidProvider(e)} required={true} items={providers} />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}
