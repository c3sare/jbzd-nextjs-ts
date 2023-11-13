import TagLink from "../../TagLink";
import Box from "../Box";
import EmptyBoxElement from "../EmptyBoxElement";
import LinkBoxElement from "../LinkBoxElement";
import prisma from "@/libs/prismadb";

const UserInfoTab: React.FC = async () => {
  const tags = await prisma.blogTag.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
    take: 12,
  });

  return (
    <>
      <Box title="Polecane tagi:">
        {tags.map((tag) => (
          <TagLink
            key={tag.id}
            name={tag.name}
            slug={tag.slug}
            count={tag._count.posts}
          />
        ))}
      </Box>
      <Box title="Obserwowane tagi">
        <EmptyBoxElement />
      </Box>
      <Box title="Czarna lista tagów">
        <EmptyBoxElement />
      </Box>
    </>
  );
};

export default UserInfoTab;
