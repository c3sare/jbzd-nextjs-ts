import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
