import { Request, Response } from "express";
import FindAllPetshop from "../models/findAllPetshop";

class FindAllPetshopController{
    async handle(req:Request,res:Response){
        
        const resultado=await FindAllPetshop.execute();
        
        res.status(200).json({resultado});
        return;
    }

}
export default new FindAllPetshopController();