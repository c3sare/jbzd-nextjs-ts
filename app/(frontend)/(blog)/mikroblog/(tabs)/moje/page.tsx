import { getSession } from "@/actions/getSession";
import BlogPost from "../../_components/pages/BlogPost";
import { getPosts } from "../_actions/getPosts";

const OwnBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return [];

  const posts = await getPosts({
    where: {
      authorId: session.user.id,
      NOT: undefined,
    },
  });

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default OwnBlogsPage;
