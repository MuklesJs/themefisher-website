import contact from "@/config/contact.json";
import { markdownify } from "@/lib/utils/textConverter";
import axios from "axios";
import { useAppContext } from "context/state";
import { useUserContext } from "context/useUserContext";
import Axios from "lib/axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import ContactMessage from "./ContactMessage";

const ContactForm = ({ ticket }) => {
  const { success_message, theme_support_disclaimer } = contact;
  const { userState } = useUserContext();
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [department, setDepartment] = useState("");
  const [theme, setTheme] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // all success messege destructure
  const { payment_problem, pre_sales_questions, theme_support, others } =
    success_message;

  // all theme support disclaimers destructure
  const { disclaimer_starting, included, not_included, disclaimer_ending } =
    theme_support_disclaimer;

  // all procucts from app context
  const { products } = useAppContext();

  const themeList = products.map((theme) => {
    return { value: theme.frontmatter.title, label: theme.frontmatter.title };
  });

  const router = useRouter();
  const themeSupportQuery = router.query["ref"];
  const hasThemeSupportQuery =
    themeSupportQuery === "theme-support" ? true : false;

  useEffect(() => {
    if (hasThemeSupportQuery) {
      setDepartment("Theme Support");
    } else {
      setDepartment("");
    }
  }, [hasThemeSupportQuery]);

  const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected && "#4ea8b9",
      "&:active": {
        background: state.isSelected ? "#4ea8b9" : "#eee",
      },
      "&:hover": {
        background: state.isSelected ? "#4ea8b9" : "#eee",
      },
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: 5,
      borderColor: state.isFocused ? "#4ea8b9" : "#dedede",
      boxShadow: null,
      "&:hover": {
        borderColor: state.isFocused ? "#4ea8b9" : "#dedede",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 40,
      "&>input": {
        height: "unset",
      },
    }),
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      // user log
      await Axios.patch(`/user-log/contact/${session?.user?.id}`, {
        email: email.value,
        date: new Date().toISOString().slice(0, 10),
      });

      // form submit
      const response = await axios.post(
        "https://formsubmit.co/ajax/themefisher@themefisher.thrivedesk.email",
        {
          _subject:
            form_department.value === "Others"
              ? subject.value
              : `${form_department.value} ${
                  form_department.value === "Theme Support" ? ": " + theme : ""
                }`,
          name: full_name.value,
          email: email.value,
          profession: profession.value,
          website: website.value,
          subject:
            form_department.value === "Others"
              ? subject.value
              : `${form_department.value} ${
                  form_department.value === "Theme Support" ? ": " + theme : ""
                }`,
          product: form_department.value === "Theme Support" && theme,
          message: message.value,
        },
        {
          headers: { "Content-type": "application/json" },
        },
      );
      setSubmitted(response.data.success);
    } catch (error) {
      setSubmitted(error);
    }
  };

  const departmentHandler = (e) => {
    setDepartment(e.target.value);

    // set success message
    if (department == "Theme Support") {
      setSuccessMessage(theme_support);
    } else if (department == "Pre Sales Questions") {
      setSuccessMessage(pre_sales_questions);
    } else if (department == "Payment Problem") {
      setSuccessMessage(payment_problem);
    } else {
      setSuccessMessage(others);
    }
  };

  return (
    <>
      {!submitted ? (
        <form
          className="row items-center"
          id="form"
          method="POST"
          onSubmit={formHandler}
        >
          <div className={`sm:col-6 mb-4 ${ticket && "hidden"}`}>
            <label
              htmlFor="full_name"
              className="mb-2 block font-semibold text-dark"
            >
              Name
              <span className="lh-1 text-red-600">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              id="full_name"
              name="full_name"
              placeholder="Your name"
              defaultValue={
                userState.users?.first_name + " " + userState.users?.last_name
              }
              required
            />
          </div>
          <div className={`sm:col-6 mb-4 ${ticket && "hidden"}`}>
            <label
              htmlFor="profession"
              className="mb-2 block font-semibold text-dark"
            >
              Profession
              <span className="lh-1 text-red-600">*</span>
            </label>
            <select
              name="profession"
              id="profession"
              className="form-select"
              defaultValue={
                userState.users?.profession ? userState.users?.profession : ""
              }
              required={ticket ? false : true}
            >
              <option disabled value="">
                Your profession
              </option>
              <option value="Founder / CEO">Founder / CEO</option>
              <option value="Developer">Developer</option>
              <option value="Engineer">Engineer</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Agency Owner">Agency Owner</option>
              <option value="Director">Director</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={`sm:col-6 mb-4 ${ticket && "hidden"}`}>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold text-dark"
            >
              Email
              <span className="lh-1 text-red-600">*</span>
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              placeholder="Purchase Email"
              defaultValue={userState.users?.email}
              required
            />
          </div>
          <div className={`sm:col-6 mb-4 ${ticket && "hidden"}`}>
            <label
              htmlFor="website"
              className="mb-2 block font-semibold text-dark"
            >
              Website
            </label>
            <input
              type="text"
              className="form-input"
              id="website"
              name="website"
              defaultValue={userState.users?.website}
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              placeholder="https://examplesite.com"
            />
          </div>
          <div className="col-12 mb-4">
            <label
              htmlFor="form_department"
              className="mb-2 block font-semibold text-dark"
            >
              Select Department
              <span className="lh-1 text-red-600">*</span>
            </label>
            <select
              name="form_department"
              id="form_department"
              className="form-select"
              onChange={(e) => departmentHandler(e)}
              required
            >
              {hasThemeSupportQuery ? (
                <>
                  <option disabled value="">
                    Choose department
                  </option>
                  <option selected value="Theme Support">
                    Theme Support
                  </option>
                </>
              ) : (
                <>
                  <option disabled selected value="">
                    Choose department
                  </option>
                  <option value="Theme Support">Theme Support</option>
                </>
              )}
              {!ticket && (
                <>
                  <option value="Pre Sales Questions">
                    Pre Sales Questions
                  </option>
                  <option value="Payment Problem">Payment Problem</option>
                </>
              )}

              <option value="Others">Others</option>
            </select>
            {!ticket && department === "Theme Support" && (
              <div className="mt-3 rounded border border-[#e9e8bb] bg-[#fffff8] py-5 px-4 prose-a:text-primary">
                {markdownify(disclaimer_starting, "p", "mb-3")}

                <p className="mb-1">
                  <strong>Included:</strong>
                </p>
                <ul className="mb-4">
                  {included.map((item, i) => (
                    <li key={`included-${i}`}>
                      <span className="mr-2 text-[13px]">✅</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mb-1">
                  <strong>Not Included:</strong>
                </p>

                <ul className="mb-4">
                  {not_included.map((item, i) => (
                    <li key={`included-${i}`}>
                      <span className="mr-2 text-[10px]">❌</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {markdownify(disclaimer_ending, "p")}
              </div>
            )}
          </div>
          {department === "Theme Support" && (
            <div className="col-12 mb-4">
              <label
                htmlFor="product"
                className="mb-2 block font-semibold text-dark"
              >
                Select Theme
                <span className="lh-1 text-red-600">*</span>
              </label>
              <Select
                id="theme"
                instanceId="theme"
                defaultValue={theme}
                onChange={(e) => setTheme(e.value)}
                options={themeList}
                isSearchable
                styles={selectStyle}
                placeholder="Choose theme"
              />
            </div>
          )}
          {department === "Others" && (
            <div className="col-12 mb-4">
              <label
                htmlFor="subject"
                className="mb-2 block font-semibold text-dark"
              >
                Subject
                <span className="lh-1 text-red-600">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                id="subject"
                name="subject"
                placeholder="Type your subject here"
                required
              />
            </div>
          )}

          <div className="col-12 mb-4">
            <label
              htmlFor="message"
              className="mb-2 block font-semibold text-dark"
            >
              Message
              <span className="lh-1 text-red-600">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              className="form-input py-3"
              rows="5"
              placeholder="Your message ..."
              required
            />
          </div>
          <div className="col-12 mb-4 text-end">
            <button
              className="btn btn-primary no-wrap"
              type="submit"
              disabled={loader}
            >
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
          <div className="col-12">
            <small
              style={{ fontSize: "12px" }}
              className="order-1 mb-3 inline-block pt-1 text-dark"
            >
              Your data is safe with us. We take your privacy seriously and
              never share your data with anyone. Check our{" "}
              <Link href="/privacy-policy" className="underline">
                privacy policy
              </Link>
            </small>
          </div>
        </form>
      ) : (
        <ContactMessage success_message={successMessage} ticket={ticket} />
      )}
    </>
  );
};

export default ContactForm;
