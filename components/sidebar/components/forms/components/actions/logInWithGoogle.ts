"use server";

import { signIn } from "@/auth";

export const logInWithGoogle = async () => {
  await signIn("google");
};
