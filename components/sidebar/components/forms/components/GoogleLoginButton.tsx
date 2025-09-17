"use client";

import { logInWithGoogle } from "./actions/logInWithGoogle";

const GoogleLoginButton: React.FC<{
  disabled?: boolean;
}> = ({ disabled }) => {
  return (
    <div className="w-full pt-2">
      <button
        disabled={disabled}
        onClick={async (e) => {
          e.preventDefault();
          await logInWithGoogle();
        }}
        className="w-full block bg-red-500 text-white rounded-[4px] leading-[30px] text-[13px] disabled:opacity-80"
      >
        Zaloguj się z Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
