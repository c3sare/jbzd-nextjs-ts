import getSession from "@/app/actions/getSession";
import AccountDetailsSchema, {
  AccountDetailsType,
} from "@/app/formSchemas/AccountDetailsSchema";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
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
      birthdate: user?.birthdate || null,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const body: AccountDetailsType = await request.json();

    const parsedBody = AccountDetailsSchema.safeParse(body);

    if (!parsedBody.success)
      return new NextResponse("Internal Error", { status: 400 });

    const { name, gender, city, country, birthdate } = parsedBody.data;

    const update = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: name || "",
        gender,
        city: city || "",
        country: country || "",
        birthdate,
      },
    });

    if (!update) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json({
      name: update?.name || "",
      gender: update?.gender || 0,
      country: update?.country || "",
      city: update?.city || "",
      birthdate: update?.birthdate || null,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
