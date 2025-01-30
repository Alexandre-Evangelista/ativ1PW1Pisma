import { prisma } from "../database/repository";
import { error } from "console";

type Params = {
    name: string;
    type: string;
    description: string;
    deadline_vaccination: Date;
    petshopCNPJ: string;
};

class RegisterPet{
    async execute ({name,type,description,deadline_vaccination,petshopCNPJ}:Params){
        const cnpj = petshopCNPJ;
        const petshop= await prisma.petshop.findUnique({
            where:{
                cnpj
            }
        });
        if (!petshop) {
            return { status: 400, error, message: 'Petshop não existe!' };
            stop;
          }
          const { DateTime } = require('luxon');
          const dataFormatada = DateTime.fromFormat(deadline_vaccination, 'dd/MM/yyyy').toISO();

          const novoPet = await prisma.pet.create({
            data:{
                name,
                type,
                description,
                deadline_vaccination: dataFormatada,
                petshop:{
                    connect:{
                        cnpj
                    }
                }
            }
        });
        return {novoPet};
    
    }
}
export default new RegisterPet();