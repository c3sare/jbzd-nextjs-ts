import { getSession } from "@/actions/getSession";
import ChangePasswordSchema, {
  ChangePasswordType,
} from "@/validators/UserSettings/ChangePasswordSchema";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    if (session?.user?.provider !== "credentials")
      return new NextResponse(
        "Can't change a password in account signed from provider!",
        { status: 500 }
      );

    const body: ChangePasswordType = await request.json();

    const parsedBody = ChangePasswordSchema.parse(body);

    const { newPassword } = parsedBody;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const update = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        hashedPassword,
      },
    });

    return NextResponse.json({
      username: update.username,
      email: update.email,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
