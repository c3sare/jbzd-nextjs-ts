import { signIn } from "next-auth/react";
import { SetStateAction } from "react";
import { toast } from "react-hot-toast";

const GoogleLoginButton: React.FC<{
  setIsLoading: (value: SetStateAction<boolean>) => void;
  disabled?: boolean;
}> = ({ setIsLoading, disabled }) => {
  return (
    <div className="w-full pt-2">
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
          signIn("google", { redirect: false }).then((callback) => {
            if (callback?.error) {
              toast.error("Nieprawidłowe dane!");
            }

            if (callback?.ok && !callback?.error) {
              toast.success("Zostałeś zalogowany!");
            }
          });
        }}
        className="w-full block bg-red-500 text-white rounded-[4px] leading-[30px] text-[13px] disabled:opacity-80"
      >
        Zaloguj się z Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
