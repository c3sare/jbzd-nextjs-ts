import { getSession } from "@/actions/getSession";
import AccountDetailsSchema, {
  AccountDetailsType,
} from "@/validators/UserSettings/AccountDetailsSchema";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
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

    return NextResponse.json({
      name: user?.name || "",
      gender: user?.gender || 0,
      country: user?.country || "",
      city: user?.city || "",
      birthdate: user?.birthdate || null,
    });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const body: AccountDetailsType = await request.json();

    const parsedBody = AccountDetailsSchema.parse(body);

    const { name, gender, city, country, birthdate } = parsedBody;

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
    revalidatePath("/uzytkownik/ustawienia");
    return NextResponse.json({
      name: update?.name || "",
      gender: update?.gender || 0,
      country: update?.country || "",
      city: update?.city || "",
      birthdate: update?.birthdate || null,
    });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
