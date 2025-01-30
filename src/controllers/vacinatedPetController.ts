import { Request, Response } from "express";
import VacinatedPet from "../models/vacinatedPet";
import { prisma } from '../database/repository';

class VacinatedPetController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id)

        const { cnpj } = req.headers;
        console.log("cnpj: ", cnpj, " tipo: ", typeof cnpj)

        if (typeof cnpj == 'string') {


            const petshop = await prisma.petshop.findUnique({
                where: { cnpj }
            });

            console.log("petshop: ", petshop);

            if (!petshop) {
                res.status(400).json({ error: 'Petshop não existente' });
                return;
            }
            const petshopCNPJ = cnpj;
            const result = await VacinatedPet.execute({ id, petshopCNPJ });



            res.status(200).json(result);
            return;

        }
    }
}

export default new VacinatedPetController();