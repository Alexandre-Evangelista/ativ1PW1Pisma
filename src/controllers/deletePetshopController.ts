import { Request, Response } from "express";
import DeletePetshop from "../models/deletePetshop";
import { prisma } from '../database/repository';

class DeletePetshopController{
    async handle(req:Request,res:Response){
        const{cnpj}=req.params;

        const resultado=await DeletePetshop.execute({cnpj});
        res.status(200).json(resultado);
        return;
    }
}