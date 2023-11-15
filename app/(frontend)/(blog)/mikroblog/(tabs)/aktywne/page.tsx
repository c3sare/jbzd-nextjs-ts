import BlogPost from "../../_components/pages/BlogPost";
import { getPosts } from "../_actions/getPosts";
import { getSelectedDate } from "../_utils/getSelectedDate";

type ActiveBlogsPageProps = {
  searchParams: {
    time?: string;
  };
};

const ActiveBlogsPage: React.FC<ActiveBlogsPageProps> = async ({
  searchParams,
}) => {
  const posts = await getPosts({
    where: {
      addTime: {
        gte: getSelectedDate(searchParams.time),
      },
    },
    orderBy: {
      children: {
        _count: "desc",
      },
    },
  });

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default ActiveBlogsPage;
