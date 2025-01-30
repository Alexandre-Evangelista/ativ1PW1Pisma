import { Request, Response } from "express";
import DeletePet from "../models/deletePet";
import { prisma } from '../database/repository';

class DeletePetController{
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const { cnpj } = req.headers;
        if (typeof cnpj == 'string') {


            const petshop = await prisma.petshop.findUnique({
                where: { cnpj }
            });

            if (!petshop) {
                res.status(400).json({ error: 'Petshop não existente' });
                return;
            }

        const petshopCNPJ = cnpj;
            const result = await DeletePet.execute({ id, petshopCNPJ });


            res.status(200).json(result);
            return;
        }
    }
}
export default new DeletePetController();