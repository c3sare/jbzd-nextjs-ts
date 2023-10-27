import { auth } from "@/auth";

export async function getSession() {
  return await auth();
}
