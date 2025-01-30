import { prisma } from "../database/repository";

type Params = {
    id: string;
    petshopCNPJ: string;
}

class VacinatedPet {


  async execute({ id, petshopCNPJ  }: Params) {

    const cnpj = petshopCNPJ;
    const pet = await prisma.pet.findUnique({
        where: { id }
    });
    console.log(pet);

    
    const petVacinad = await prisma.pet.update({
      where: {
        id
      },
      data: {
        vaccinated: true,
        petshop: {
          connect: {
            cnpj
          }
        }
    }
  })
  const petch = await prisma.pet.findUnique({
    where: { id }
});
console.log(petch);
    return { petVacinad }
  }

}

export default new VacinatedPet();