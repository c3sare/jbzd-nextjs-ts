import { getSession } from "@/app/actions/getSession";
import UserPremiumSchema from "@/app/validators/UserSettings/UserPremiumSchema";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      select: {
        premium: true,
        premiumExpires: true,
      },
    });

    const premiumExpireDate = user?.premiumExpires
      ? user.premiumExpires.getTime()
      : null;
    const currentDate = new Date().getTime();

    const isPremium = premiumExpireDate
      ? premiumExpireDate > currentDate
      : false;

    return NextResponse.json({
      isPremium,
      premium: isPremium ? user.premium : {},
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error " + err, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const body = await request.json();

    const premium = UserPremiumSchema.parse(body);

    const user = await prisma.user.update({
      where: { email: session.user.email, premiumExpires: { gte: new Date() } },
      data: {
        premium,
      },
    });

    return NextResponse.json({ premium: user.premium });
  } catch (err: any) {
    throw new NextResponse("Internal Error " + err, { status: 500 });
  }
}
