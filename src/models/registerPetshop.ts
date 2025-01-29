import { prisma } from "../database/repository";
import { error } from "console";

type Params = {
    cnpj: string;
    name: string;
    
};
class RegisterPetshop{
    
    
    async execute({ cnpj,name}: Params) {

    const petshop = await prisma.petshop.findUnique({
        where:{
            cnpj
        }
    });

    if (petshop!==null) {
        return {status: 400,error, message:"Error: petshop ja existe"}
    }
    const novoPetshop = await prisma.petshop.create({
        data:{
            cnpj,
            name
            }
    });
    return novoPetshop;
}
}

export default new RegisterPetshop();