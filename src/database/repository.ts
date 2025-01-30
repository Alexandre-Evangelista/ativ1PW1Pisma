import {PrismaClient } from '@prisma/client';
import type {Petshop, Pet } from '@prisma/client';
  
  
  const prisma = new PrismaClient();
  
  export { prisma, Petshop, Pet }