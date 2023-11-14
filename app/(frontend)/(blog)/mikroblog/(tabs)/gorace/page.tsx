import { getSession } from "@/actions/getSession";
import BlogPost from "../../_components/pages/BlogPost";
import prisma from "@/libs/prismadb";
import { notFound } from "next/navigation";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../_utils/transformPosts";

type ActiveBlogsPageProps = {
  searchParams: {
    time?: string;
  };
};

const ActiveBlogsPage: React.FC<ActiveBlogsPageProps> = async ({
  searchParams,
}) => {
  const session = await getSession();

  const selectedTime = ["24h", "12h", "6h"].includes(searchParams.time ?? "")
    ? searchParams.time
    : "24h";

  const date = new Date();

  const inHours = Number(selectedTime!.slice(0, -1));

  date.setHours(date.getHours() - inHours);

  if (!session?.user) return notFound();

  const activeBlogs = await prisma.blogPost.findMany({
    where: {
      NOT: {
        parentId: {
          isSet: true,
        },
      },
      addTime: {
        lte: date,
      },
    },
    include: {
      ...getIncludePostData(session.user.id),
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });

  const posts = transformPosts(activeBlogs, session.user.id);

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default ActiveBlogsPage;
