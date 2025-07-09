import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import { validatePassword } from "@/lib/utils/validatePassword";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UpdatePassword = ({ session }) => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userState, userDispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (userState.error) {
        throw new Error("password does not match requirements");
      }
      const res = await Axios.patch(
        `authentication/update-password`,
        {
          user_id: session?.user?.id,
          newPassword: password.newPassword,
          currentPassword: password.currentPassword,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        setPassword({
          ...password,
          currentPassword: "",
          newPassword: "",
        });
        setLoader(false);
        setSubmitted(true);
      }
    } catch (errors) {
      setError("Password does not match");
      setLoader(false);
    }
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword({ ...password, newPassword });
    userDispatch({
      type: "UPDATE_ERROR",
      payload: validatePassword(newPassword)
        ? ""
        : "Min 8 char, At least 1 upper, 1 lower, and 1 digit",
    });
  };

  return !userState.users ? (
    <div>loading...</div>
  ) : (
    <form className="row justify-center" onSubmit={handleSubmit}>
      <div className="col-12 mb-8">
        <h3 className="text-h4">Update Password</h3>
      </div>
      <div className="lg:col-6 mb-4">
        <label htmlFor="new-password" className="form-label">
          Current Password
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="password"
          className="form-input"
          id="new-password"
          name="new-password"
          placeholder="Enter New Password"
          value={password.currentPassword}
          onChange={(e) => {
            setPassword({ ...password, currentPassword: e.target.value });
          }}
          required
        />
      </div>
      <div className="lg:col-6 mb-4">
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
            value={password.newPassword}
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
      <div className="lg:col-12 mt-4 text-right">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loader || submitted}
        >
          {loader ? (
            <>
              Updating
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
          ) : submitted ? (
            "Updated"
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
