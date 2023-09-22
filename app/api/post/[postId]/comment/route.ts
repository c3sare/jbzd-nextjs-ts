import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

type RequestParams = {
  params: {
    postId: string;
  };
};

export async function POST(
  request: Request,
  { params: { postId } }: RequestParams
) {
  if (!postId)
    return new NextResponse("No id provided or type is invalid", {
      status: 400,
    });

  const { text, commentId } = await request.json();

  if (!text) return new NextResponse("No authorization", { status: 403 });

  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: session.user.id,
        postId,
        content: text,
        precedentId: commentId,
      },
      include: {
        post: {
          include: {
            author: true,
          },
        },
      },
    });

    const userNamePattern = /@\[[A-Za-z0-9_\-]*\]/g;

    const usernames: string[] = text.match(userNamePattern);

    await Promise.all(
      usernames.map(async (user) => {
        const account = await prisma.user.findFirst({
          where: {
            username: user.slice(2, -1),
          },
        });

        if (
          account?.notifications?.newMarks &&
          account.id !== comment.authorId
        ) {
          await prisma.notification.create({
            data: {
              type: "COMMENT_PIN",
              post: {
                connect: {
                  id: comment.postId,
                },
              },
              comment: {
                connect: {
                  id: comment.id,
                },
              },
              user: {
                connect: { id: account.id },
              },
              author: {
                connect: {
                  id: comment.authorId,
                },
              },
            },
          });
        }
      })
    );

    const { newComments, commentsOnHomePage } =
      comment.post.author.notifications!;

    if (
      (newComments || (commentsOnHomePage && comment.post.accepted)) &&
      comment.authorId !== comment.post.authorId
    ) {
      await prisma.notification.create({
        data: {
          type: "NEW_COMMENT",
          post: {
            connect: {
              id: comment.postId,
            },
          },
          user: {
            connect: { id: comment.post.authorId },
          },
          comment: {
            connect: {
              id: comment.id,
            },
          },
          author: {
            connect: {
              id: comment.authorId,
            },
          },
        },
      });
    }

    return NextResponse.json({ id: comment.id });
  } catch (err: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
