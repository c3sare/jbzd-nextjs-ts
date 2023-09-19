import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/getSession";
import SidebarForms from "@/app/components/sidebar/components/SidebarForms";

type LoginPageType = {
  searchParams: {
    error: string;
  };
  params: {};
};

const ErrorMessagesDetails: {
  [key: string]: string;
} = {
  OAuthSignin:
    "Wystąpił problem przy próbie logowania, spróbuj ponownie później.",
  OAuthCallback:
    "Wystąpił problem przy próbie logowania, spróbuj ponownie później.",
  OAuthCreateAccount:
    "Wystąpił problem przy tworzeniu konta, spróbuj ponownie póżniej.",
  EmailCreateAccount:
    "Wystąpił problem przy tworzeniu konta, spróbuj ponownie póżniej.",
  Callback: "Wystąpił problem, spróbuj ponownie później",
  OAuthAccountNotLinked:
    "Ten adres e-mail jest używany przez inną metodę logowania.",
  EmailSignin:
    "Wystąpił problem przy wysyłaniu wiadomości e-mail z tokenem aktywacyjnym!",
  CredentialsSignin:
    "The authorize callback returned null in the Credentials provider. We don't recommend providing information about which part of the credentials were wrong, as it might be abused by malicious hackers.",
  SessionRequired:
    "The content of this page requires you to be signed in at all times. See useSession for configuration.",
  Default: "Wystąpił nieznany błąd, spróbuj ponownie później.",
};

const LoginPage: React.FC<LoginPageType> = async ({
  searchParams: { error },
}) => {
  const session = await getSession();

  if (session?.user?.email) return redirect("/");

  const keys = Object.keys(ErrorMessagesDetails);

  const message = keys.includes(error)
    ? ErrorMessagesDetails[error]
    : "Wystąpił nieznany problem!";

  return (
    <>
      <div>
        <h1 className="m-6 text-3xl font-bold">Logowanie</h1>
        <SidebarForms />
        {error && (
          <div className="my-2 text-sm text-center text-red-600 full-w">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
