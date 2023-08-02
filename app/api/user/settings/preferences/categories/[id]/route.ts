import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};

export async function DELETE(
  _request: Request,
  { params: { id } }: RequestParams
) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const categoryAction = await prisma.followedCategory.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });

    revalidatePath("/uzytkownik/ustawienia/preferencje");

    return NextResponse.json(categoryAction);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
