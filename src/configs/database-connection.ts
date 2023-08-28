import { PrismaClient } from '@prisma/client';

export let prisma = new PrismaClient();

export function connect(): void {
  prisma = new PrismaClient();
}

export async function disconnect(): Promise<void> {
  await prisma.$disconnect();
}

export default prisma;
