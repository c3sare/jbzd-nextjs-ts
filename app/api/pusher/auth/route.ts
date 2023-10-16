import { pusherServer } from "@/libs/pusher";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/actions/getSession";

async function handler(req: NextRequest) {
  const session = await getSession();

  if (!session?.user?.email) {
    return NextResponse.json({}, { status: 401 });
  }

  const { socket_id, channel_name } = await req.json();

  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(
    socket_id,
    channel_name,
    data
  );
  return NextResponse.json(authResponse);
}

export { handler as GET, handler as POST };
