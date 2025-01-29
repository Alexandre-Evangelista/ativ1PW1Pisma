import { prisma } from "../database/repository";
type Params={
    cnpj:string;

}
class DeletePetshop{
    async execute({cnpj}:Params){
        try {
            const petshop = await prisma.petshop.delete({
                where: {
                    cnpj
                }
            });

            if (!petshop) {
                return { message: "Petshop não encontrado ou já deletado", success: false };
            }

            return { message: "Pet deletado com sucesso", success: true };
        } catch (error) {
            // Tratamento de erro caso a operação falhe
            console.error("Erro ao deletar o pet:", error);
            return { message: "Erro ao tentar deletar o petshop", success: false };
        }
    }
}