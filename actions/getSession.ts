import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (err) {
    console.log(err);
    return null;
  }
}
