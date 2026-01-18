
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Prevent multiple instances of Prisma Client in development
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.warn("Warning: DATABASE_URL is not defined in environment variables. Prisma Client may fail to connect.");
} else {
  console.log("Initializing Prisma Client with URL:", dbUrl);
}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
