import { Router } from 'express';

// importacao de controllers

const routes = new Router();

// criação das rotas
routes.get('/teste', (req, res) => {
  return res.json({
    message: 'Matheus Nicoli is gay'
  });
});

export default routes;
