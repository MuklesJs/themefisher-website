import { useUserContext } from "context/useUserContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";

const LoginForm = ({ setAuthComplete }) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    userState: { email },
  } = useUserContext();

  const router = useRouter();
  const isCheckoutPage = router.asPath.includes("checkout");

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    const res = await signIn("credentials", {
      email: email ? email : user.email,
      password: user.password,
      redirect: false,
    });

    if (res.status === 200) {
      router.replace(isCheckoutPage ? "/checkout" : "/dashboard/downloads");
      setUser({ ...user, email: "", password: "" });
      isCheckoutPage && setAuthComplete(true);
      setLoader(false);
    } else {
      setError("Incorrect email or password");
      setLoader(false);
    }
  };

  return (
    <form
      className="row"
      id="service-form"
      method="POST"
      onSubmit={loginHandler}
    >
      {!email && (
        <div className="col-12 mb-4">
          <label htmlFor="email" className="form-label">
            Email
            <span className="lh-1 text-red-600">*</span>
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            placeholder="johndoe@email.com"
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value.toLowerCase(),
              });
            }}
            required
          />
        </div>
      )}
      <div className="col-12">
        <label htmlFor="password" className="form-label">
          Password
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
          required
        />
      </div>

      <div className="col-12 mt-2 text-end">
        <span
          onClick={() =>
            router.push({
              pathname: "/login",
              query: {
                emailVerify: true,
              },
            })
          }
          className="text-light underline cursor-pointer hover:text-primary"
        >
          Lost Password?
        </span>
      </div>

      <div className="col-12 mt-5">
        <button
          className={`btn btn-primary block w-full ${isCheckoutPage && "bg-[#27C762] hover:bg-[#27C762]"}`}
          type="submit"
        >
          {loader ? (
            <>
              Please Wait
              <Spinner />
            </>
          ) : (
            <>
              {isCheckoutPage ? (
                <>
                  Login And Checkout{" "}
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <path
                      d="M1.5 5H11.5M11.5 5L7.33333 1M11.5 5L7.33333 9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                "Log In"
              )}
            </>
          )}
        </button>
      </div>
      <div className="col-12 mt-5">
        {error && <p className="message message-error">{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
