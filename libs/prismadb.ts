import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const clientPrisma = new PrismaClient().$extends(withAccelerate());

type ClientPrisma = typeof clientPrisma;

declare global {
  var prisma: ClientPrisma | undefined;
}

const client = globalThis.prisma || clientPrisma;
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
