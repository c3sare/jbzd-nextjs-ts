"use server";

import { signIn } from "@/auth";

type Data = {
  login: string;
  password: string;
};

export async function logInWithCredentials(formData: Data) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
