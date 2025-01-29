import { prisma } from "../database/repository";

type Params={
    id:string;
    petshopCNPJ:string;
}

class DeletePet {
    async execute({ id, petshopCNPJ }: Params) {
        
        try {
            const pet = await prisma.pet.delete({
                where: {
                    id,
                    petshopCNPJ
                }
            });

            if (!pet) {
                return { message: "Pet não encontrado ou já deletado", success: false };
            }

            return { message: "Pet deletado com sucesso", success: true };
        } catch (error) {
            // Tratamento de erro caso a operação falhe
            console.error("Erro ao deletar o pet:", error);
            return { message: "Erro ao tentar deletar o pet", success: false };
        }
    }
}
export default new DeletePet();