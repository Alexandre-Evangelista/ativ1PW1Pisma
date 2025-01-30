import { Request, Response } from "express";
import FindAllPetshopByPetshop from "../models/findAllPetsByPetshop";

class FindAllPetshopByPetshopController{
    async handle(req:Request,res:Response){
        const{cnpj}=req.body;

        const pet =await FindAllPetshopByPetshop.execute({cnpj});
        res.status(200).json({pet})
    }

}
export default new FindAllPetshopByPetshopController();