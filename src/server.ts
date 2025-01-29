import { error } from 'console';
import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

// Tipos definidos
type Pet = {
    id: string;
    name: string;
    type: string;
    description: string;
    deadline_vaccination: Date;
    vaccinated: boolean;
    create_at: Date;
};

type Petshop = {
    id: string;
    cnpj: string;
    name: string;
    pets: Pet[];
};

interface RequestWithPetshop extends Request {
    petshop?: Petshop; // Use o modificador opcional "?"
}

// Base de dados
let petshops: Petshop[] = [];

const app = express();
app.use(express.json());

// Função auxiliar para realizar patch em um objeto
function partialUpdate<T>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];

            // Verifica se o valor não é undefined antes de atribuir
            if (sourceValue !== undefined) {
                const targetValue = target[key];

                if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                    // Substitui arrays diretamente
                    target[key] = sourceValue as any;
                } else if (
                    typeof targetValue === 'object' &&
                    targetValue !== null &&
                    typeof sourceValue === 'object' &&
                    sourceValue !== null
                ) {
                    // Recursão para objetos aninhados
                    partialUpdate(targetValue as any, sourceValue as any);
                } else {
                    // Substitui valores primitivos diretamente
                    target[key] = sourceValue as T[Extract<keyof T, string>];
                }
            }
        }
    }
    return target;
}

function isValidCNPJ(input: string): boolean {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;
    return cnpjRegex.test(input);
}


// Middleware para verificar petshop por CNPJ
function checkExistsPetshop(request: Request, response: Response, next: NextFunction) {
    const cnpj = request.headers.cnpj as string;
    console.log(cnpj);
    const petshop = petshops.find((shop) => shop.cnpj === cnpj);

    if (!petshop) {
        response.status(404).json({ error: 'Petshop não encontrado' });
        return;
    }
    (request as RequestWithPetshop).petshop = petshop;
    next();

}

// CRUD para petshops
app.post('/petshops', (request: Request, response: Response) => {
    const { name, cnpj } = request.body;

    if (!isValidCNPJ(cnpj)) {
        response.status(400).json({ error: "formato invalido do CNPJ " });
        return;
    }


    const existingPetshop = petshops.find((shop) => shop.cnpj === cnpj);

    if (existingPetshop) {
        response.status(400).json({ error: 'O petshop ja existe ' });
        return;
    }
    else {
        const petshop: Petshop = {
            id: uuid(),
            name,
            cnpj,
            pets: [],
        };

        petshops.push(petshop);
        response.status(201).json({ message: 'Petshop criado com sucesso', petshop });
    }
});

app.get('/petshops', (request: Request, response: Response) => {
    response.status(200).json(petshops);
});

app.get('/petshops/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const petshop = petshops.find((shop) => shop.id === id);

    if (!petshop) {
        response.status(404).json({ error: 'Petshop não foi encontrado' });
        return;
    }

    response.status(200).json(petshop);
});

app.patch('/petshops/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const updateData = request.body;

    if (request.body.cnpj) {
        const cnpj = request.body.cnpj;
        if (!isValidCNPJ(cnpj)) {
            response.status(400).json({ error: " formado invalido do CNPJ " });
            return;
        }
    }

    const petshopIndex = petshops.findIndex((shop) => shop.id === id);
    if (petshopIndex === -1) {
        response.status(404).json({ error: 'Petshop not found' });
        return;
    }

    // Validação básica dos dados
    if (typeof updateData !== 'object' || updateData === null) {
        response.status(400).json({ error: 'Invalid update data' });
        return;
    }

    // Clona o petshop antes de atualizar
    const updatedPetshop = { ...petshops[petshopIndex] };
    petshops[petshopIndex] = partialUpdate(updatedPetshop, updateData);

    response.status(200).json({ message: 'Petshop updated successfully', petshop: petshops[petshopIndex] });
});


app.delete('/petshops/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const petshopIndex = petshops.findIndex((shop) => shop.id === id);

    if (petshopIndex === -1) {
        response.status(404).json({ error: 'Petshop not found' });
        return;
    }

    petshops.splice(petshopIndex, 1);
    response.status(200).json({ message: 'Petshop deleted successfully' });
});


app.post('/pets', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const { name, type, description, deadline_vaccination } = request.body;
    const petshop = request.petshop;

    if (!petshop) {
        response.status(400).json({ message: 'Erro: Petshop não encontrado' });
        return;
    }

    
    const deadlineDate = new Date(deadline_vaccination);
    if (isNaN(deadlineDate.getTime())) {
        response.status(400).json({ error: 'Invalid deadline_vaccination date' });
        return;
    }

    // Criação do objeto Pet
    const pet: Pet = {
        id: uuid(),
        name,
        type,
        description,
        deadline_vaccination: deadlineDate, // Já validado
        vaccinated: false,
        create_at: new Date(),
    };

    petshop.pets.push(pet);
    response.status(201).json({ message: 'Pet adicionado com sucesso', pet });
});



app.get('/pets', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const petshop = request.petshop;
    if (petshop) {
        response.status(200).json(petshop.pets);
    }
});

app.put('/pets/:id', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const { id } = request.params;
    const { name, type, description, deadline_vaccination } = request.body;
    const petshop = request.petshop; 
    if (petshop) {
        const pet = petshop.pets.find((p: Pet) => p.id === id);
        if (pet) {
            pet.name = name;
            pet.type = type;
            pet.description = description;
            pet.deadline_vaccination = deadline_vaccination;
            response.status(200).json({ message: 'Pet updated successfully', pet });
        } else {
            response.status(404).json({ error: 'Pet não encontrado' });
        }
    } else {
    
        response.status(400).json({ message: 'Error: Pet não encontrado' });
    }
});

app.patch('/pets/:petId', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const { petId } = request.params;
    const updateData = request.body;
    const petshop = request.petshop;

    if (!petshop) {
        response.status(400).json({ message: 'Error: Petshop not found' });
        return;
    }

    const petIndex = petshop.pets.findIndex((pet) => pet.id === petId);
    if (petIndex === -1) {
        response.status(404).json({ error: 'Pet not found' });
        return;
    }

    // Valida dados basicos
    if (typeof updateData !== 'object' || updateData === null) {
        response.status(400).json({ error: 'Invalid update data' });
        return;
    }

    // Clona o pet antes de atualizar
    const updatedPet = { ...petshop.pets[petIndex] };
    petshop.pets[petIndex] = partialUpdate(updatedPet, updateData);

    response.status(200).json({ message: 'Pet updated successfully', pet: petshop.pets[petIndex] });
});



app.patch('/pets/:id/vaccinated', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const { id } = request.params;
    const petshop = request.petshop;

    
    if (petshop) {
        const pet = petshop.pets.find((p: Pet) => p.id === id);
        if (pet) {
            pet.vaccinated = true;
            response.status(200).json({ message: 'Pet marked as vaccinated', pet });
        } else {
            response.status(404).json({ error: 'Pet not found' });
        }
    } else {
        
        response.status(400).json({ message: 'Error: Petshop not found' });
    }
});

app.delete('/pets/:id', checkExistsPetshop, (request: RequestWithPetshop, response: Response) => {
    const { id } = request.params;
    const petshop = request.petshop;

    if (petshop) {
        const filteredPets = petshop.pets.filter((p: Pet) => p.id !== id);

        if (filteredPets && filteredPets.length === petshop.pets.length) {
            response.status(404).json({ message: 'Pet não encontrado' });
            return;
        }

        if (filteredPets !== undefined) {
            petshop.pets = filteredPets;
            response.status(200).json({ message: 'Pet excluido com sucesso' });
        } else {
            response.status(404).json({ message: 'Pet não encontrado' });
        }
    } else {
        response.status(400).json({ message: 'Error: Petshop não encontrado' });
    }
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
});