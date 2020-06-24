import { Router } from 'express';
import ProviderController from './app/controllers/ProviderController';
import ProductController from './app/controllers/ProductController';
import SalesmanController from './app/controllers/SalesmanController';
import SaleController from './app/controllers/SaleController';
import CashController from './app/controllers/CashController';

// importacao de controllers


const routes = new Router();

routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.put('/providers/:id', ProviderController.update);
routes.delete('/providers/:id', ProviderController.destroy);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.post('/login', SalesmanController.login);
routes.get('/salesmans', SalesmanController.index);
routes.post('/salesmans', SalesmanController.store);
routes.put('/salesmans/:id', SalesmanController.update);
routes.delete('/salesmans/:id', SalesmanController.destroy);

routes.get('/sales', SaleController.index);
routes.post('/sales', SaleController.store);
routes.put('/sales/:id', SaleController.update);
routes.delete('/sales/:id', SaleController.destroy);

routes.get('/cashs', CashController.index);
routes.post('/cashs', CashController.store);
routes.put('/cashs/:id', CashController.update);
routes.delete('/cashs/:id', CashController.destroy);
routes.get('/cashs/total', CashController.show);



export default routes;
