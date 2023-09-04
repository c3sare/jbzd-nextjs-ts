import prisma from "@/app/libs/prismadb";

export default async function getPosts(pharse: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: pharse,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    return posts;
  } catch (err: any) {
    return null;
  }
}
