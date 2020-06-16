import { Router } from 'express';
import ProviderController from './app/controllers/ProviderController';
import ProductController from './app/controllers/ProductController';

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

export default routes;
