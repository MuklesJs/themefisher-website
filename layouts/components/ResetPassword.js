import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import { validatePassword } from "@/lib/utils/validatePassword";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userState, userDispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (newPassword !== confirmPassword || userState.error) {
        throw new Error("Password does not match");
      }
      const res = await Axios.patch(
        `authentication/recovery-password`,
        {
          email: userState.email,
          password: newPassword,
          currentDate: new Date().toISOString(),
        },
        {
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        setError("");
        router.push(`/login?passwordReseted=true`);
        setLoader(false);
      }
    } catch (errors) {
      console.log(errors);
      setError(errors.message);
      setLoader(false);
    }
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    userDispatch({
      type: "UPDATE_ERROR",
      payload: validatePassword(newPassword)
        ? ""
        : "Min 8 char, At least 1 upper, 1 lower, and 1 digit",
    });
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-12 mb-4">
        <label htmlFor="password" className="form-label">
          New Password
          <span className="lh-1 text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-input"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={newPassword}
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
      <div className="col-12 mb-4">
        <label htmlFor="confirm_password" className="form-label">
          Confirm New Password
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="password"
          className="form-input"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
        />
      </div>

      <div className="col-12 mt-5">
        <button type="submit" className="btn btn-primary w-full block">
          {loader ? (
            <>
              Changing Password
              <svg
                height="25"
                width="25"
                className="ml-2"
                viewBox="0 0 100 100"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
      <div className="col-12 mt-5">
        {error && <p className="message message-error">{error}</p>}
      </div>
    </form>
  );
};

export default ResetPassword;
