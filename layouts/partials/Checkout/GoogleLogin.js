import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleLogin = () => {
  return (
    <button
      className="btn btn-sm btn-outline-primary w-full mb-3 flex items-center justify-center space-x-3"
      type="submit"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/checkout?authComplete=true",
        })
      }
    >
      <Image
        src={"/images/icons/google.svg"}
        width={30}
        height={30}
        alt="google"
      />
      <span>
        Continue with Google
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path
            d="M1.5 5H11.5M11.5 5L7.33333 1M11.5 5L7.33333 9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export default GoogleLogin;
