import { prisma } from '../database/repository';

type Params = {
    id:string
    name: string;
    type: string;
    description: string;
    deadline_vaccination: Date;
    petshopCNPJ: string;
    
}
class UpdatePet{

    async execute ({id,name,type,description,deadline_vaccination,petshopCNPJ}:Params){

    const cnpj = petshopCNPJ;
    const { DateTime } = require('luxon');
    const dataFormatada = DateTime.fromFormat(deadline_vaccination, 'dd/MM/yyyy').toISO();

        const updatePet= await prisma.pet.update({
            where:{
                id
            },
            data:{
                    name,
                    type,
                    description,
                    deadlineVaccination:dataFormatada,
                    petshop:{
                        connect:{cnpj}
                    }
                    
                }

        });
        return {updatePet}
    }
}
export default new UpdatePet();