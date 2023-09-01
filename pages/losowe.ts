import prisma from "@/app/libs/prismadb";

export default function RandomPage() {
  return;
}

export async function getServerSideProps() {
  const recordsCount = await prisma.postStats.count();
  const skip = Math.floor(Math.random() * recordsCount);
  const query = await prisma.postStats.findMany({
    take: 1,
    skip: skip,
  });

  if (!query)
    return {
      notFound: true,
    };

  const post = query[0];

  return {
    redirect: {
      destination: `/obr/${post.id}/${post.slug}`,
      permament: false,
    },
  };
}
