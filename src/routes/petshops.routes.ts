import { Router } from 'express';

import DeletePetshopControlle from '../controllers/registerPetshopController';

import registerPetshopController from '../controllers/registerPetshopController';

import updatePetshopControlle from '../controllers/updatePetshopController';

import findAllPetshopController from '../controllers/findAllPetshopController';

const routesPetshops = Router();


routesPetshops.post('/petshops', registerPetshopController.handle);
routesPetshops.get('/petshops', findAllPetshopController.handle);
routesPetshops.put('/petshops/:id', updatePetshopControlle.handle);

routesPetshops.delete('/petshops/:id', DeletePetshopControlle.handle);

export { routesPetshops }