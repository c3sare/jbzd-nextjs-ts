import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import PasswordResetSchema, {
  PasswordResetType,
} from "@/validators/Sidebar/PasswordRemind/PasswordResetSchema";
import bcrypt from "bcrypt";
import { formatISO } from "date-fns";

export async function POST(request: Request) {
  try {
    const body: PasswordResetType = await request.json();

    const parsedBody = PasswordResetSchema.parse(body);

    const { email, token, password } = parsedBody;

    const hashedPassword = await bcrypt.hash(password, 12);

    const currentDate = formatISO(new Date());

    const userUpdate = await prisma.user.update({
      where: {
        email,
        token,
        tokenExpires: { gt: currentDate },
      },
      data: {
        hashedPassword,
        token: null,
        tokenExpires: null,
      },
    });

    return NextResponse.json({
      username: userUpdate.username,
      email: userUpdate.email,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
