import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import GetTokenSchema, {
  GetTokenType,
} from "@/app/validators/Sidebar/PasswordRemind/GetTokenSchema";
import getUniqueId from "@/app/libs/getUniqueId";
import { formatISO } from "date-fns";
import sendMail from "@/app/libs/sendMail";

export async function POST(request: Request) {
  try {
    const body: GetTokenType = await request.json();

    const parsedBody = GetTokenSchema.parse(body);

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

    let tokenExpires: Date | string = new Date();
    tokenExpires.setMinutes(tokenExpires.getMinutes() + 15);

    tokenExpires = formatISO(tokenExpires);

    const update = await prisma.user.update({
      where: { email: email },
      data: { token, tokenExpires },
    });

    sendMail(
      email,
      "Reset hasła",
      `Witam,\n token zmiany hasła: ${token}, ważny przez 15 minut.\n\nPozdrawiam.`
    );

    return NextResponse.json({
      username: update.username,
      email: update.email,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
