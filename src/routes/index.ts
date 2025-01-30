import { Router, Request, Response } from "express";

import { routesPetshops} from "./petshops.routes";
import { routesPet } from "./pets.routes";



const routes = Router();

routes.use(routesPetshops);
routes.use(routesPet);

export { routes };