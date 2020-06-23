import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Menu, Button } from './styles';
import {
  IoIosAirplane,
  IoIosBasket,
  IoIosPeople
} from 'react-icons/io';

export default function CMenu({ history }) {

  return (
    <>
      <Menu>
        <Button to='/providers'>
          <IoIosAirplane />
          <span>Fornecedores</span>
        </Button>

        <Button to='/products'>
          <IoIosBasket />
          <span>Produtos</span>
        </Button>

        <Button to='/salesmans'>
          <IoIosPeople />
          <span>Vendedores</span>
        </Button>

        <Button to='/sales'>
          <IoIosBasket />
          <span>Vendas</span>
        </Button>
      </Menu >
    </>
  );
}
