import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const regex = /^([A-Za-z0-9\_])\w{1,21}$/;

export async function POST(req: Request) {
  try {
    const { pharse } = await req.json();

    if (!regex.test(pharse))
      return new NextResponse("Invalid Pharse", { status: 400 });

    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 403 });

    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: pharse,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
