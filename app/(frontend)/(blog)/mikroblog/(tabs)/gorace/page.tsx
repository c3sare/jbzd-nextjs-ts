import BlogPostInfiniteScroll from "../../_components/BlogPostInfiniteScroll";
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
        lte: getSelectedDate(searchParams.time),
      },
    },
    orderBy: [
      {
        votes: {
          _count: "desc",
        },
      },
      { addTime: "desc" },
    ],
  });

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getPosts({
      where: {
        addTime: {
          lte: getSelectedDate(searchParams.time),
        },
      },
      orderBy: [
        {
          votes: {
            _count: "desc",
          },
        },
        { addTime: "desc" },
      ],
      skip: 1,
      cursor: {
        id: cursor,
      },
    });

    return posts;
  }

  return (
    <BlogPostInfiniteScroll
      isEnd={posts.length < 10}
      getPostsFunc={getPostsFunc}
      initalPosts={posts}
    />
  );
};

export default ActiveBlogsPage;
