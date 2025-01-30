import { Request, Response } from "express";
import RegisterPet from "../models/registerPet";

class RegisterPetController{
    async handle(req:Request,res:Response){
        const{name, type, description, deadline_vaccination}= req.body;
        console.log(name, type, description, deadline_vaccination);
        const {cnpj}=req.headers;
        const petshopCNPJ= cnpj as string;

        const resultado= await RegisterPet.execute({name,type,description,deadline_vaccination,petshopCNPJ});

        
        if (resultado.status !== 400) {
            res.status(200).json({ resultado });
         } else {
            res.status(resultado.status).json({ error: resultado.message });
         }
    
    }
}
export default new RegisterPetController();