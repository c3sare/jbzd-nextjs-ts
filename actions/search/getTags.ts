import prisma from "@/libs/prismadb";

export default async function getTags(pharse: string) {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: pharse,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return tags;
  } catch (err: any) {
    return null;
  }
}
