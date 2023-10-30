import { signIn } from "next-auth/react";
import { SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { logInWithFacebook } from "./actions/logiInWithFacebook";

const FacebookLoginButton: React.FC<{
  setIsLoading: (value: SetStateAction<boolean>) => void;
  disabled?: boolean;
}> = ({ setIsLoading, disabled }) => {
  return (
    <div className="w-full">
      <button
        disabled={disabled}
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          await logInWithFacebook();
        }}
        className="w-full block bg-[#1877f2] text-white rounded-[4px] leading-[30px] text-[13px] disabled:opacity-80"
      >
        Zaloguj się z Facebookiem
      </button>
    </div>
  );
};

export default FacebookLoginButton;
