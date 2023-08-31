import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const RandomMemPage = async () => {
  const recordsCount = await prisma.postStats.count();
  const skip = Math.floor(Math.random() * recordsCount);
  const query = await prisma.postStats.findMany({
    take: 1,
    skip: skip,
  });

  if (!query) return notFound();

  revalidatePath("/losowe");

  const post = query[0];

  redirect(`/obr/${post.id}/${post.slug}`);
};

export default RandomMemPage;
