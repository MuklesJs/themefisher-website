import LoginForm from "@/components/LoginForm";
import Separator from "@/components/Separator";
import SignUpForm from "@/components/SignUpForm";
import { useCartContext } from "@/context/useCartContext";
import Base from "@/layouts/Baseof";
import CheckoutActions from "@/partials/Checkout/CheckoutActions";
import CheckoutFacts from "@/partials/Checkout/CheckoutFacts";
import CheckoutSteps from "@/partials/Checkout/CheckoutSteps";
import CheckoutTestimonials from "@/partials/Checkout/CheckoutTestimonials";
import EmptyCart from "@/partials/Checkout/EmptyCart";
import GoogleLogin from "@/partials/Checkout/GoogleLogin";
import PaddleLoader from "@/partials/Checkout/PaddleLoader";
import PaymentOptions from "@/partials/Checkout/PaymentOptions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Checkout = ({ session }) => {
  const router = useRouter();
  const [authComplete, setAuthComplete] = useState(
    router.query.authComplete === "true",
  );
  const { cartState } = useCartContext();
  const { carts } = cartState;

  const [title, setTitle] = useState("Checkout");

  // Change title when switching tabs
  useEffect(() => {
    const originalTitle = "Checkout";
    const dealTitle = "Don't miss out the deal!";
    setTitle(originalTitle);
    document.title = originalTitle;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTitle(dealTitle);
        document.title = dealTitle;
      } else {
        setTitle(originalTitle);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      setTitle(originalTitle);
      document.title = originalTitle;
    };
  }, []);

  return (
    <Base title={title} headerClassName="bg-theme-gray" chat={true}>
      <section className="section-sm min-h-screen pt-0 bg-theme-gray">
        <div className="container">
          {!carts?.length ? (
            <EmptyCart />
          ) : (
            <>
              <CheckoutSteps />
              <div className="row">
                <div className="lg:col-6 order-2 lg:order-1 space-y-6">
                  {/* login form */}
                  {!session && (
                    <div className="p-6 bg-white rounded-lg">
                      {/* login/signup title */}
                      <div className="mb-6">
                        {!router.query.callbackUrl ? (
                          <div className="flex items-center justify-between">
                            <h3 className="text-h5">Create An Account</h3>
                            <p className="text-sm text-light">
                              Already have an account?{" "}
                              <button
                                onClick={() =>
                                  router.push("/checkout?callbackUrl=/checkout")
                                }
                                className="text-primary underline"
                              >
                                Login
                              </button>
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <h3 className="text-h5">Login Your Account</h3>
                            <p className="text-sm text-light">
                              Don't have an account?{" "}
                              <button
                                onClick={() => router.push("/checkout")}
                                className="text-primary"
                              >
                                Signup
                              </button>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* google login */}
                      <GoogleLogin />

                      {/* separator */}
                      <Separator />

                      {/* login/signup form */}
                      {!router.query.callbackUrl ? (
                        <SignUpForm setAuthComplete={setAuthComplete} />
                      ) : (
                        <LoginForm setAuthComplete={setAuthComplete} />
                      )}
                    </div>
                  )}

                  {/* payment options */}
                  <PaymentOptions className={"p-6 bg-white"} />

                  {/* testimonials */}
                  <CheckoutTestimonials />

                  {/* facts */}
                  <CheckoutFacts />
                </div>
                <div className="lg:col-6 order-1 lg:order-2 mb-6 lg:mb-0">
                  <PaddleLoader />
                  <CheckoutActions
                    authComplete={authComplete}
                    setAuthComplete={setAuthComplete}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Base>
  );
};

export default Checkout;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
