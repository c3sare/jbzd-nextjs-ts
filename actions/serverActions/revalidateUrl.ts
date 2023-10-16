"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateUrl(url: string) {
  revalidatePath(url, "page");
}
