import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { sessionSet, isLogged } from '../../session';

import { Container } from './styles';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (isLogged()) window.location = '/home';
  }, []);

  const login = async e => {
    e.preventDefault();

    const response = (await api.post('/login', { cpf, password: senha })).data;

    if (response.success) {
      window.location = '/home';

      sessionSet(response.salesman);
    } else {
      alert("CPF e/ou senha não cadastrados no sistema!");
    }
  };

  return (
    <Container>
      <form onSubmit={login}>
        <h1>ControlAqui</h1>
        <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
}

export default Login;