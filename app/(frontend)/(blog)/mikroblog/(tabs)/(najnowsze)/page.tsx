import BlogPost from "../../_components/pages/BlogPost";
import { getPosts } from "../_actions/getPosts";

const NewestBlogsPage = async () => {
  const posts = await getPosts({});

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default NewestBlogsPage;
