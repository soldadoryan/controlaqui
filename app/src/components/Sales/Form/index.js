import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import { FaTimes } from 'react-icons/fa';

import { WrapForm } from './styles';

import CInput from '../../CInput';
import CSelect from '../../CSelect';
import CButton from '../../CButton';

export default function Form({ item, success, close }) {

  const [total, setTotal] = useState(0);
  const [idSalesman, setIdSalesman] = useState('');
  const [idProduct, setIdProduct] = useState('');
  const [salesmans, setSalesmans] = useState([]);
  const [products, setProducts] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    setIdSalesman(item.id_salesman);
    setIdProduct(item.id_product);
    getSalesmans();
    getProducts();
  }, [item]);

  const getSalesmans = async () => {
    const response = (await api.get('/salesmans')).data;

    setSalesmans(response);
  };

  const getProducts = async () => {
    const response = (await api.get('/products')).data;

    setProducts(response);
  };

  const addProduct = () => {
    const auxList = [...listProducts, idProduct];
    setListProducts(auxList);
    setIdProduct('');
    calcularTotal(auxList);
  };

  const calcularTotal = lista => {
    var auxTotal = 0;

    lista.map(item => {
      var auxProd = products.filter(prod => prod.id == item);

      auxTotal += auxProd[0].unity_value;
    });

    setTotal(auxTotal);
  };

  const removeProduct = id => {
    const aux = listProducts;

    aux.splice(aux.indexOf(id), 1);

    setListProducts(aux);
    calcularTotal(aux);
  };

  const submitForm = async e => {
    e.preventDefault();

    let response;

    if (item.id) {
      response = (await api.put(`/sales/${item.id}`, {
        total,
        products: listProducts,
        id_salesman: idSalesman,
      })).data;
    } else {
      response = (await api.post('/sales', {
        total,
        products: listProducts,
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

      <ul>
        {listProducts.map(item => {
          var auxProduct = products.filter(prod => { return prod.id == item; });

          return (

            <li>
              <label>{auxProduct[0].description}</label>
              <div className='right'>
                <span>R${auxProduct[0].unity_value}</span>
                <FaTimes onClick={() => removeProduct()} />
              </div>
            </li>

          )
        })}

        <hr />

        <li>
          <label>Total</label>
          <div className='right'>
            <span>R${total}</span>
          </div>
        </li>
      </ul>

      <CSelect label='Produto' val={idProduct} indexValue='id' indexLabel='description' change={e => setIdProduct(e)} items={products.filter(item => item.quantity > 0)} />
      <CButton ctype='button' click={() => addProduct()} title='Adicionar produto' cstyle='success small' />

      <CSelect label='Vendendor' val={idSalesman} indexValue='id' indexLabel='name' change={e => setIdSalesman(e)} required={true} items={salesmans} />
      <CButton title='Salvar' cstyle='primary small' />
    </WrapForm>
  );
}