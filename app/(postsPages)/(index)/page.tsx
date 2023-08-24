import prisma from "@/app/libs/prismadb";
import PostsPage from "../components/PostsPage";

export default async function Home() {
  const posts = await prisma.postStats.findMany({});

  if (!posts) return new Error("Internal error");

  return (
    <PostsPage
      page={1}
      pageSlug=""
      currentNode="Strona główna"
      posts={posts || []}
    />
  );
}
