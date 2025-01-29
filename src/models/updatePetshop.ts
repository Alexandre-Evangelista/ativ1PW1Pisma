import { prisma } from '../database/repository';

type Params = {
    name:string;
    cnpj:string;
    
}
class UpdatePetshop{

    async execute ({name,cnpj}:Params){
        const petshop = await prisma.petshop.findUnique({
            where: { cnpj }
          });
          if(!petshop){
            return { status: 400, message: 'Petshop náo existente!' };
            stop;
          }
          const id = petshop.id;
        const updatePetshop= await prisma.petshop.update({
            where:{
                id
            },
            data:{
                    name,
                    cnpj
                }

        });
        return {updatePetshop}
    }
}
export default new UpdatePetshop();