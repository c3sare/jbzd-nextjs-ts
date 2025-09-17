import { SetStateAction } from "react";
import { logInWithFacebook } from "./actions/logiInWithFacebook";

const FacebookLoginButton: React.FC<{
  disabled?: boolean;
}> = ({ disabled }) => {
  return (
    <div className="w-full">
      <button
        disabled={disabled}
        onClick={async (e) => {
          e.preventDefault();
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
