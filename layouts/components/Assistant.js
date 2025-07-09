/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Axios from "lib/axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import ImageFallback from "./ImageFallback";
import Spinner from "./Spinner";

const Assistant = ({ enable, openTrigger }) => {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openAssistant, setOpenAssistant] = useState(false);
  const router = useRouter();
  const page = "https://themefisher.com" + router.asPath;

  const isCheckoutPage = router.asPath.split("?")[0] === "/checkout";

  useEffect(() => {
    if (openTrigger) {
      setOpenAssistant(true);
    }
  }, [openTrigger]);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // user log
      await Axios.patch(`/user-log/contact/${session?.user?.id}`, {
        email: mail.value,
        date: new Date().toISOString().slice(0, 10),
      });

      // form submit
      const response = await axios.post(
        "https://formsubmit.co/ajax/themefisher@themefisher.thrivedesk.email",
        {
          _subject: department.value,
          name: fullname.value,
          email: mail.value,
          subject: department.value,
          page: page,
          message: message.value,
        },
        {
          headers: { "Content-type": "application/json" },
        },
      );
      setSubmitted(response.data.success);
      setLoader(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false);
      setLoader(false);
    }
  };

  return (
    <>
      {enable && (
        <div className="assistant">
          <div
            className={`fixed bottom-[90px] z-[99999] w-full max-w-full origin-bottom-right overflow-hidden rounded-2xl bg-body pb-6 shadow transition-all duration-300 ease-[cubic-bezier(.175,.885,.32,1.275)] sm:right-5 sm:max-w-[350px] ${
              openAssistant
                ? "visible scale-100 opacity-100"
                : "invisible scale-75 opacity-0"
            }`}
          >
            <div className="bg-primary px-6 pt-8 pb-6 text-center">
              <div className="assistant-users flex items-center justify-center">
                <ImageFallback
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/mehedi.png"
                  alt="mehedi"
                  height="45"
                  width="45"
                />
                <ImageFallback
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/tuhin.png"
                  alt="tuhin"
                  height="45"
                  width="45"
                />
                <ImageFallback
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/farhad.png"
                  alt="farhad"
                  height="45"
                  width="45"
                />
                <ImageFallback
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/somrat.png"
                  alt="somrat"
                  height="45"
                  width="45"
                />
              </div>
              <h4 className="h5 mb-0 font-primary text-body">
                How can we help?
              </h4>
              <small className="text-md text-body opacity-75">
                We usually respond within 24 hours
              </small>
            </div>
            <div className="assistant-body pt-3">
              {!submitted ? (
                <form
                  className="assistant-form overflow-y-auto px-5"
                  id="form"
                  method="POST"
                  onSubmit={formHandler}
                >
                  <label htmlFor="fullname" className="mb-1 block">
                    <small className="font-semibold text-dark opacity-75">
                      Name
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-input mb-2 h-[48px] px-4"
                    id="fullname"
                    name="fullname"
                    required
                  />

                  <label htmlFor="mail" className="mb-1 block">
                    <small className="font-semibold text-dark opacity-75">
                      Email address
                    </small>
                  </label>
                  <input
                    type="email"
                    className="form-input mb-2 h-[48px] px-4"
                    id="mail"
                    name="mail"
                    required
                  />

                  <label htmlFor="department" className="mb-1 block">
                    <small className="font-semibold text-dark opacity-75">
                      Select department
                    </small>
                  </label>
                  <select
                    name="department"
                    id="department"
                    className="form-select mb-2 h-[48px] px-4"
                    defaultValue="Select department"
                    required
                  >
                    <option disabled value="Select department"></option>
                    {!isCheckoutPage && (
                      <option value="Theme Support">Theme Support</option>
                    )}
                    <option value="Pre Sales Questions">
                      Pre Sales Questions
                    </option>
                    <option value="Payment Problem">Payment Problem</option>
                    <option value="Others">Others</option>
                  </select>

                  <label htmlFor="message" className="mb-1 block">
                    <small className="font-semibold text-dark opacity-75">
                      How can we help?
                    </small>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    className="form-input mb-2 h-auto px-4"
                    rows="3"
                    required
                  ></textarea>

                  <small className="block" style={{ fontSize: "12px" }}>
                    <span className="text-danger">*</span> Your data is safe
                    with us. Check our{" "}
                    <Link
                      className="text-primary underline"
                      href="/privacy-policy"
                    >
                      privacy policy
                    </Link>
                  </small>

                  <div className="mt-3 mb-2 pt-1">
                    <button
                      className={`btn btn-primary btn-sm w-100 block w-full ${
                        loader && "btn-active"
                      } `}
                      type="submit"
                    >
                      {loader ? (
                        <>
                          Sending
                          <Spinner />
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="assistant-respond h-[380px] py-12 px-9 text-center">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.1864 6.02603C28.0058 6.04705 27.4652 6.10992 26.9851 6.16584C23.753 6.54231 20.1704 7.80439 17.3606 9.55638C14.3563 11.4295 11.4072 14.3831 9.50978 17.4191C7.83398 20.1002 6.6114 23.567 6.11774 27.0372C5.96075 28.1408 5.96075 31.8452 6.11774 32.9488C6.51091 35.7127 7.24141 38.1338 8.38273 40.4556C9.67399 43.0824 10.9388 44.8471 13.0269 46.9353C15.0922 49.0005 16.8845 50.2902 19.4128 51.5305C21.177 52.396 22.3161 52.8172 24.1046 53.2658C25.9459 53.7277 27.3223 53.9215 29.2186 53.986C34.6872 54.172 39.9353 52.5031 44.4198 49.1523C45.6627 48.2237 47.9499 45.9856 48.8484 44.8189C51.2095 41.7528 52.7928 38.3284 53.5122 34.7316C53.865 32.9674 53.9409 32.1287 53.9409 29.993C53.9409 27.402 53.6978 25.5486 53.0964 23.5546C52.9046 22.9187 52.8002 22.7319 52.4631 22.4211C51.4602 21.4967 49.9601 21.7587 49.36 22.963C49.0543 23.5763 49.0511 23.8449 49.3361 24.9481C49.4597 25.4262 49.6326 26.2185 49.7205 26.7087C49.937 27.9176 50.0128 30.7319 49.8649 32.0716C49.3495 36.7387 47.3961 40.8169 44.0946 44.1183C41.2999 46.9131 37.861 48.789 34.1194 49.5598C32.5946 49.874 31.5583 49.9781 29.9506 49.9791C24.5935 49.9821 19.661 47.933 15.8429 44.1183C14.6205 42.8971 13.5451 41.5241 12.7354 40.1509C9.32689 34.37 9.05111 27.2605 12.0012 21.2194C14.6858 15.7216 19.798 11.7116 25.7467 10.4375C28.5947 9.82747 31.8187 9.85722 34.6051 10.5191C36.616 10.9968 38.9153 11.961 40.6126 13.038C41.519 13.6132 41.8356 13.7124 42.5467 13.6441C43.7925 13.5245 44.5942 12.0637 44.0543 10.8976C43.8411 10.4371 43.5351 10.1491 42.6839 9.6079C39.9825 7.89025 36.7144 6.70211 33.3004 6.19662C32.4034 6.06375 28.8749 5.94608 28.1864 6.02603ZM51.176 10.154C50.9617 10.2456 47.2187 13.9221 40.4097 20.7286L29.972 31.1629L26.4752 27.6851C23.5168 24.7426 22.9191 24.1903 22.5923 24.0974C22.001 23.9292 21.6075 23.9644 21.067 24.2337C20.2227 24.6544 19.8129 25.5375 20.0292 26.4698C20.1353 26.9266 20.2922 27.0971 24.4677 31.2935C27.3796 34.2199 28.9192 35.701 29.1717 35.819C29.6511 36.0429 30.2884 36.0426 30.7669 35.8183C31.0265 35.6965 34.6317 32.1476 42.4653 24.3022C54.4417 12.3078 53.99 12.791 53.99 11.9767C53.99 11.2643 53.5234 10.5297 52.8542 10.1883C52.4236 9.9686 51.6463 9.95274 51.176 10.154Z"
                      fill="#36CE57"
                    />
                  </svg>
                  <p className="text-dark">
                    We've received your query. We will get in touch with you
                    within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            className={`assistant-btn cursor-pointer ${
              openAssistant && "active -rotate-45"
            } fixed bottom-5 right-5 z-[9999] inline-block h-[62px] w-[62px] scale-90 items-center justify-center rounded-full bg-primary text-[26px] font-bold text-body transition-all hover:scale-100`}
            onClick={() =>
              setOpenAssistant(!openAssistant) & setSubmitted(false)
            }
          >
            {openAssistant ? <HiOutlinePlus /> : <BsChat />}
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;
