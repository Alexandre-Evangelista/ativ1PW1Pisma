import { prisma } from "../database/repository";

class FindAllPetshops {


  async execute() {

    const petshops = await prisma.petshop.findMany({
      select: {
        cnpj: true,
        id:true,
        name:true,
        pets: {
          select: {
            name: true,
            type: true,
          }
        }
      }
    });
    return { petshops }
  }
}

export default new FindAllPetshops();