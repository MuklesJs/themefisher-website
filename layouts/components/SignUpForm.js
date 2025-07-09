import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import { validatePassword } from "@/lib/utils/validatePassword";
import countryDetector from "lib/utils/countryDetector";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "./Spinner";

const SignUpForm = ({ setAuthComplete }) => {
  const router = useRouter();
  const country = countryDetector();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const { userDispatch, userState } = useUserContext();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: country,
  });

  const reset = () => {
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      country: country,
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (userState.error) {
        setError("Password does not match condition");
        setLoader(false);
      } else {
        const res = await Axios.post("/user", user);
        if (res.status === 200) {
          const signin = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
          });

          if (signin.status === 200) {
            router.replace("/checkout");
            reset();
            setAuthComplete(true);
            setLoader(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setLoader(false);
    }
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      password: newPassword,
    }));
    userDispatch({
      type: "UPDATE_ERROR",
      payload: validatePassword(newPassword)
        ? ""
        : "Min 8 char, At least 1 upper, 1 lower, and 1 digit",
    });
  };

  return (
    <>
      <form
        className="row"
        id="signup-form"
        method="POST"
        onSubmit={signupHandler}
      >
        <div className="md:col-6 mb-4">
          <label htmlFor="first_name" className="form-label">
            First Name
            <span className="lh-1 text-red-600">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            id="first_name"
            name="first_name"
            placeholder="John"
            onChange={(e) => {
              setUser({
                ...user,
                first_name: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="md:col-6 mb-4">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="last_name"
            className="form-input"
            id="last_name"
            name="last_name"
            placeholder="Doe"
            onChange={(e) => {
              setUser({
                ...user,
                last_name: e.target.value,
              });
            }}
          />
        </div>
        <div className="md:col-6 mb-4">
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
        <div className="md:col-6 mb-4">
          <label htmlFor="password" className="form-label">
            Password
            <span className="lh-1 text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChangePassword}
              required
            />
            <button
              className="absolute right-3 top-3"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {userState.error && (
            <small className="mt-2 text-red-600">{userState.error}</small>
          )}
        </div>
        <div className="col-12 mt-8">
          <button
            className={`btn btn-primary block w-full bg-[#27C762] hover:bg-[#27C762]`}
            type="submit"
          >
            {loader ? (
              <>
                Please Wait
                <Spinner />
              </>
            ) : (
              <>
                Register And Checkout{" "}
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
            )}
          </button>
        </div>
        <div className="col-12 mt-5">
          {error && <p className="message message-error">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
