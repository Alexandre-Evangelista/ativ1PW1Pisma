import { prisma,Pet } from "../database/repository";


type Params = {
    cnpj:string;
};

class FindAllPetsByPetshop{

    async execute({cnpj}:Params):Promise<Pet[]>{
        const pets = await prisma.pet.findMany({
            where: {
              petshopCNPJ: cnpj,
            },
          });
        return pets;
    }

}
export default new FindAllPetsByPetshop()