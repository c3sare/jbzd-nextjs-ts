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

    const { name, gender, city, country, birthdate } =
      AccountDetailsSchema.parse(body);

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

    return NextResponse.json({});
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
