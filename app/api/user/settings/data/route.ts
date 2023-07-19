import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

async function GET() {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user)
      return new NextResponse("User from session not found", { status: 404 });

    return NextResponse.json({
      name: user?.name || "",
      gender: user?.gender || 0,
      country: user?.country || "",
      city: user?.city || "",
      birthdate: user?.birthdate || "",
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

type DataToSet = {
  name?: string;
  gender?: 0 | 1 | 2 | 3;
  country?: string;
  city?: string;
  birthdate?: string | null;
};

async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const body = await request.json();
    const { name, gender, country, city, birthdate } = body;

    let dataToSet: DataToSet = {
      name: name || "",
      gender: [0, 1, 2, 3].includes(gender) ? gender : 0,
      country: country || "",
      city: city || "",
      birthdate: birthdate || null,
    };

    const update = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: dataToSet,
    });

    if (!update) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json({});
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export { GET, POST };
