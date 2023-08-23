import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

type PrismaType = typeof prisma;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaType | undefined;
};

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
