import { signIn } from "next-auth/react";
import { SetStateAction } from "react";
import { toast } from "react-hot-toast";

const FacebookLoginButton: React.FC<{
  setIsLoading: (value: SetStateAction<boolean>) => void;
}> = ({ setIsLoading }) => {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setIsLoading(true);
          signIn("facebook", { redirect: false }).then((callback) => {
            if (callback?.error) {
              toast.error("Nieprawidłowe dane!");
            }

            if (callback?.ok && !callback?.error) {
              toast.success("Zostałeś zalogowany!");
            }
          });
        }}
        className="w-full block bg-[#1877f2] text-white rounded-[4px] leading-[30px] text-[13px]"
      >
        Zaloguj się z Facebookiem
      </button>
    </div>
  );
};

export default FacebookLoginButton;
