import prisma from "../libs/prismadb";

export default async function getUser(username: string) {
  try {
    const user = await prisma.userProfile.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
