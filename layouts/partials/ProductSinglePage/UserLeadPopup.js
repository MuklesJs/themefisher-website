import useOs from "@/hooks/useOs";
import Axios from "@/lib/axios";
import countryDetector from "lib/utils/countryDetector";
import { useState } from "react";

const UserLeadPopup = ({
  isUserLeadPopup,
  setIsUserLeadPopup,
  downloadData,
  singleProduct,
  slug,
}) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { platForm } = useOs();
  const country = countryDetector();

  const { type, categories, title, github } = singleProduct.frontmatter;

  // downloadData
  const handleUpdate = async () => {
    await Axios.put(`free-theme/${slug}`, {
      download: downloadData,
      date: new Date(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await Axios.post("/user-lead", {
        email: email,
        first_name: first_name,
        last_name: last_name,
        country: country,
        marketing_consent: isChecked,
        themeInfo: [
          {
            type: type,
            theme: title,
            category: categories[0],
            download_count: 1,
          },
        ],
        os: platForm,
        download: `${github}/archive/refs/heads/main.zip`,
      });

      if (response.status === 200) {
        setEmail("");
        setFirstName("");
        setLastName("");
        setIsChecked(false);
        setSubmitted(true);
        setLoader(false);
        handleUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bundle-popup ${
        isUserLeadPopup ? `visible opacity-100` : "invisible opacity-0"
      }`}
    >
      <div
        className="popup-toggler"
        onClick={() => setIsUserLeadPopup(false)}
      />

      <div className="bundle-popup-content w-[540px] p-8 md:p-12">
        {submitted ? (
          <div className="text-center">
            <h5 className="mb-6">Thank you for downloading the template.</h5>
            <p className="mb-5">
              Please check your inbox, as well as your spam folder.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setIsUserLeadPopup(false) & setSubmitted(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-12 mb-6">
                <h5>Enter your email to get download link</h5>
              </div>
              <div className="lg:col-6 mb-4">
                <input
                  className="form-input"
                  type="text"
                  placeholder="First name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="lg:col-6 mb-4">
                <input
                  className="form-input"
                  type="text"
                  placeholder="Last name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-4">
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 mb-6">
                <label className="flex">
                  <input
                    className="form-checkbox text-primary rounded-[2px]"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span className="ml-2 text-xs text-gray-700 font-normal">
                    Themefisher may send me product updates and offers via
                    email. It is possible to opt-out at any time.{" "}
                  </span>
                </label>
              </div>
              <div className="col-12">
                <button
                  className={`btn btn-primary ${
                    !isChecked ? "btn-disabled" : ""
                  }`}
                  type="submit"
                  disabled={isChecked ? false : true}
                >
                  {loader ? (
                    <>
                      Submitting
                      <svg
                        height="25"
                        width="25"
                        className="ms-2"
                        viewBox="0 0 100 100"
                      >
                        <path
                          fill="currentColor"
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
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLeadPopup;
