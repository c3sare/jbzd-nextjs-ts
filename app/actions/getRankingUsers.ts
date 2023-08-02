import prisma from "../libs/prismadb";

export async function getRankingUsers() {
  try {
    const users = await prisma.userRanking.findMany({});

    if (!users) {
      return [];
    }

    return users;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
