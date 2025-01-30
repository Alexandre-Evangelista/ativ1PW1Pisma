import { Request, Response } from "express";
import UpdatePetshop from "../models/updatePetshop";

class UpdatePetshopController{
    async handle(req:Request,res:Response){
        const{name,cnpj}=req.body

        const resultado= await UpdatePetshop.execute({name,cnpj});

        if (resultado.status !== 400) {
       res.status(200).json({ resultado });
    } else {
       res.status(resultado.status).json({ error: resultado.message });
    }
    }

}
export default new UpdatePetshopController();