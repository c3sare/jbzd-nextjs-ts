import PostsPage from "./components/posts/PostsPage";

export default function Home() {
  return (
    <PostsPage page={1} pageSlug="" currentNode="Strona główna" posts={[]} />
  );
}
