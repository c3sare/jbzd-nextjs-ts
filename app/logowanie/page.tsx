import { redirect } from "next/navigation";
import { getSession } from "../actions/getSession";
import HideSidebar from "../components/HideSidebar";
import SidebarForms from "../components/sidebar/components/SidebarForms";

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
        <h1 className="text-3xl font-bold m-6">Logowanie</h1>
        <SidebarForms />
        {error && (
          <div className="full-w text-red-600 text-sm text-center my-2">
            {message}
          </div>
        )}
      </div>
      <HideSidebar />
    </>
  );
};

export default LoginPage;
