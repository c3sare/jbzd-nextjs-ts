import bcrypt from "bcryptjs";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import RegisterSchema from "@/validators/Sidebar/RegisterSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = RegisterSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        premium: {
          picsCountOnPage: 8,
          adminPostsOff: false,
          commentsPicsGifsOff: false,
          hideNegativeComments: false,
          hideAds: true,
          hideProfile: false,
          hidePremiumIcon: false,
          hideLowReputationComments: false,
        },
        notifications: {
          newOrders: true,
          newMarks: true,
          commentsOnHomePage: true,
          newComments: true,
        },
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
