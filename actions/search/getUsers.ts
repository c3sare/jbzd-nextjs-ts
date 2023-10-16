import prisma from "@/libs/prismadb";

export default async function getUsers(pharse: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: pharse,
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
      },
    });

    return users;
  } catch (err: any) {
    return null;
  }
}
