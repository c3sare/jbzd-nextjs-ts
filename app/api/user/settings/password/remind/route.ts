import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import RemindEmailSchema, {
  RemindEmailType,
} from "@/app/formSchemas/PasswordRemindForms/RemindEmail";
import getUniqueId from "@/app/libs/getUniqueId";

export async function POST(request: Request) {
  try {
    const body: RemindEmailType = await request.json();

    const parsedBody = RemindEmailSchema.parse(body);

    const { email } = parsedBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    if (user?.accounts && user?.accounts?.length > 0)
      return new NextResponse("Account created by provider!", { status: 500 });

    const token = getUniqueId();

    const update = await prisma.user.update({
      where: { email: email },
      data: { token },
    });

    return NextResponse.json({
      username: update.username,
      email: update.email,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
