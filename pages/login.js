import CheckUser from "@/components/CheckUser";
import EmailVerify from "@/components/EmailVerify";
import LoginForm from "@/components/LoginForm";
import OtpVerify from "@/components/OtpVerify";
import ResetPassword from "@/components/ResetPassword";
import { useCartContext } from "@/context/useCartContext";
import Base from "@/layouts/Baseof";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const { cartDispatch } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    cartDispatch({
      type: "ADD_CART",
      payload: JSON.parse(localStorage.getItem("cart")),
    });
  }, []);

  return (
    <Base
      title={
        router.query.emailVerify
          ? "Recover Password"
          : router.query.otpVerify
            ? "Verify OTP"
            : router.query.resetPassword
              ? "Set New Password"
              : "Login Account"
      }
    >
      <section className="section relative overflow-hidden">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-8 lg:col-6 lg:mb-0">
              <div className="rounded-lg bg-white px-10 py-12 shadow relative z-10">
                <div className="mb-5 text-center">
                  <h1 className="text-h3">
                    {router.query.emailVerify
                      ? "Recover Password"
                      : router.query.otpVerify
                        ? "Verify OTP"
                        : router.query.resetPassword
                          ? "Set New Password"
                          : "Login Account"}
                  </h1>
                </div>
                {router.query.emailVerify ? (
                  <EmailVerify />
                ) : router.query.otpVerify ? (
                  <OtpVerify />
                ) : router.query.resetPassword ? (
                  <ResetPassword />
                ) : router.query.passwordReseted || router.query.userExist ? (
                  <LoginForm />
                ) : (
                  <CheckUser />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Login;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard/downloads",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
