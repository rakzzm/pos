
import { PrismaClient } from '@prisma/client';

import path from 'path';
import fs from 'fs';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Robust path resolution for SQLite in Vercel/Next.js environment
const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production (Vercel), usually try to find the file relative to cwd
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    console.log(`[Prisma] Computed DB Path: ${dbPath}`);
    
    if (fs.existsSync(dbPath)) {
      console.log('[Prisma] DB file found at computed path.');
      return `file:${dbPath}`;
    } else {
      console.error('[Prisma] DB file NOT found at computed path. Trying default env...');
      // Fallback or try copying? For now, fallback.
    }
  }
  return process.env.DATABASE_URL;
};

const url = getDatabaseUrl();

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: url,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
