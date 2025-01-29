import {PrismaClient, Petshop,Pet} from '@prisma/client';
  
  
  const prisma = new PrismaClient();
  
  export { prisma, Petshop, Pet }