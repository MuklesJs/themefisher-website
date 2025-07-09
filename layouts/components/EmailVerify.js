import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";

const EmailVerify = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { userDispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const res = await Axios.post("authentication/verify-user", {
        email: email,
        currentTime: new Date().toISOString(),
      });

      if (res.status === 200) {
        userDispatch({
          type: "ADD_ID",
          payload: res.data.result.id,
        });
        router.push(`/login?otpVerify=true`);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      setError("No user found with this email");
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-12">
        <label htmlFor="email" className="form-label">
          Email Address
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          name="email"
          placeholder="johndoe@email.com"
          onChange={(e) => {
            setEmail(e.target.value.toLowerCase());
          }}
          required
        />
      </div>
      <div className="col-12 mt-5">
        <button type="submit" className="btn btn-primary block w-full">
          {loader ? (
            <>
              Submitting
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
            "Submit"
          )}
        </button>
      </div>
      <div className="col-12 mt-5">
        {error && <p className="message message-error">{error}</p>}
      </div>
    </form>
  );
};

export default EmailVerify;
