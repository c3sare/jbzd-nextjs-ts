"use server";

import { signIn } from "@/auth";

export const logInWithFacebook = async () => {
  await signIn("facebook");
};
