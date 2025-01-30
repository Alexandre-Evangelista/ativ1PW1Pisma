import { Request, Response } from "express";
import { prisma } from "../database/repository";
import UpdatePet from "../models/updatePet";

class UpdatePetController{
    async handle(req:Request,res:Response){
        const{name, type, description, deadline_vaccination}= req.body;
        const {id}=req.params;
        const{cnpj}=req.headers;

        if(typeof cnpj == 'string'){
        const petshop = await prisma.petshop.findUnique({
            where: { cnpj }
          });
      
          console.log("petshop: " , petshop);
      
          if(!petshop){
            res.status(400).json({ error: 'Petshop não existente' });
            return;
           stop;
          }
          const petshopCNPJ= cnpj;
          const resultado=await UpdatePet.execute({id,name, type, description, deadline_vaccination,petshopCNPJ});


          res.status(200).json(resultado);
          return;
        }
    }

}
export default new UpdatePetController();