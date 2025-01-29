import { prisma } from "../database/repository";
import { error } from "console";

type Params = {
    name: string;
    type: string;
    description: string;
    deadline_vaccination: Date;
    petshopCNPJ: string;
};

class registerPet{
    async execute ({name,type,description,deadline_vaccination,petshopCNPJ}:Params){
        const cnpj = petshopCNPJ;
        const petshop= await prisma.petshop.findUnique({
            where:{
                cnpj
            }
        });
        if (!petshop) {
            return { status: 400, error, message: 'Petshop não existe!' };
          }
          const { DateTime } = require('luxon');
          const dataFormatada = DateTime.fromFormat(deadline_vaccination, 'dd/MM/yyyy').toISO();

          const novoPet = await prisma.pet.create({
            data:{
                name,
                type,
                description,
                deadlineVaccination: dataFormatada,
                petshop:{
                    connect:{
                        cnpj
                    }
                }
            }
        });
        return novoPet;
    
    }
}