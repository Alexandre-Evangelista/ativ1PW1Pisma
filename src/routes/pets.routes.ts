import { Router } from 'express';

import DeletePetController from '../controllers/deletePetController';

import vacinatedPetController from '../controllers/vacinatedPetController';

import registerPetController from '../controllers/registerPetController';

import updatePetController from '../controllers/updatePetController';

import findAllPetByPetshopControlle from '../controllers/findAllPetByPetshopController';


const routesPet = Router();

routesPet.post('/pets', registerPetController.handle);
routesPet.get('/pets/', findAllPetByPetshopControlle.handle);
routesPet.put('/pets/:id', updatePetController.handle)
routesPet.patch('/pets/:id/vaccinated', vacinatedPetController.handle)
routesPet.delete('/pets/:id', DeletePetController.handle)



export { routesPet }