import Env from "@/app/config/Env";
import { headers } from "next/headers";

export default async function getPosts(index: string | number) {
  const res = await fetch(`${Env.APP_URL}/api/posts/waiting/${index}`, {
    cache: "no-cache",
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }

  const response = await res.json();

  return response;
}
