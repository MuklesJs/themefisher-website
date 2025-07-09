import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const OtpVerify = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const { userState } = useUserContext();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [countdownTime, setCountdownTime] = useState(120);
  const [disableResendButton, setDisableResendButton] = useState(true);
  const [startCountdown, setStartCountdown] = useState(false);

  useEffect(() => {
    setStartCountdown(true);
  }, []);

  useEffect(() => {
    let countdownInterval;

    if (startCountdown) {
      countdownInterval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clean up the interval when the component unmounts or the countdown ends
    return () => clearInterval(countdownInterval);
  }, [startCountdown]);

  useEffect(() => {
    if (countdownTime === 0) {
      setDisableResendButton(false);
      setStartCountdown(false);
    } else {
      setDisableResendButton(true);
    }
  }, [countdownTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const res = await Axios.post(
        "authentication/verify-otp",
        {
          email: userState.email,
          otp: otp,
          currentTime: new Date().toISOString(),
        },
        {
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        router.push(`/login?resetPassword=true`);
        setLoader(false);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoader(false);
    }
  };

  const resendOtp = async () => {
    setCountdownTime(120);
    setDisableResendButton(true);
    setStartCountdown(true);
    setError("");
    setOtp("");
    formRef.current.reset();

    await Axios.post(
      "authentication/resend-otp",
      {
        email: userState.email,
        currentTime: new Date().toISOString(),
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  };

  return (
    <form className="row" ref={formRef} onSubmit={handleSubmit}>
      <div className="col-12">
        <label htmlFor="otp" className="form-label">
          Enter OTP
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="text"
          id="otp"
          className="form-input"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="col-12 flex justify-between items-center mt-5">
        <button type="submit" className="btn btn-primary">
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
        <button
          className="btn btn-link"
          onClick={resendOtp}
          disabled={disableResendButton}
          type="button"
        >
          Resend OTP{" "}
          <span className="ml-2 text-light">({formatTime(countdownTime)})</span>
        </button>
      </div>
      <div className="col-12 mt-5">
        {error && <p className="message message-error">{error}</p>}
      </div>
    </form>
  );
};

export default OtpVerify;
