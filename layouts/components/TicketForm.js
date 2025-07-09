import contact from "@/config/contact.json";
import { markdownify } from "@/lib/utils/textConverter";
import axios from "axios";
import { useAppContext } from "context/state";
import { useUserContext } from "context/useUserContext";
import Axios from "lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Select from "react-select";

const TicketForm = () => {
  const { theme_support_disclaimer } = contact;
  const { userState } = useUserContext();
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [department, setDepartment] = useState("");
  const [theme, setTheme] = useState("");

  // all theme support disclaimers destructure
  const { disclaimer_starting, included, not_included, disclaimer_ending } =
    theme_support_disclaimer;

  // all products from app context
  const { products } = useAppContext();

  const themeList = products.map((theme) => {
    return { value: theme.frontmatter.title, label: theme.frontmatter.title };
  });

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
        email: userState.users?.email,
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
          name: userState.users?.first_name + " " + userState.users?.last_name,
          profession: userState.users?.profession,
          email: userState.users?.email,
          website:
            form_department.value === "Theme Support" ? website.value : "",
          subject:
            form_department.value === "Others"
              ? subject.value
              : `${form_department.value} ${
                  form_department.value === "Theme Support" ? ": " + theme : ""
                }`,
          product: form_department.value === "Theme Support" ? theme : "",
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
  };

  return (
    <>
      {!submitted ? (
        <div className="row mx-0">
          <div className="lg:col-7 border border-border p-8 rounded-lg mb-8">
            <Link className="text-dark mb-4 block" href="/dashboard/tickets">
              <FaAngleLeft className="-mt-1 mr-1" />
              All Tickets
            </Link>
            <form
              className="row items-center"
              id="form"
              method="POST"
              onSubmit={formHandler}
            >
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
                  <option disabled selected value="">
                    Choose department
                  </option>
                  <option value="Theme Support">Theme Support</option>
                  <option value="Others">Others</option>
                </select>
                {department === "Theme Support" && (
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
                <>
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
                  <div className={`col-12 mb-4`}>
                    <label
                      htmlFor="website"
                      className="mb-2 block font-semibold text-dark"
                    >
                      Project URL
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
                </>
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
              <div className="col-12 mb-4">
                <button
                  className="btn btn-sm btn-primary no-wrap"
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
          </div>
          <div className="lg:col-5 pl-8 lg:mt-8">
            <div className="mb-12">
              <h3 className="h4 mb-4">Dedicated Support Agents For You</h3>
              <div className="agent-heros-img flex items-center">
                <Image
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/somrat.png"
                  alt="somrat"
                  height="60"
                  width="60"
                />
                <Image
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/farhad.png"
                  alt="farhad"
                  height="60"
                  width="60"
                />
                <Image
                  className="rounded-full border-2 border-body"
                  src="/images/support-team/tuhin.png"
                  alt="tuhin"
                  height="60"
                  width="60"
                />
              </div>
            </div>
            <div className="mb-12">
              <h3 className="h4 mb-4">Support Availability</h3>
              <p className="text-sm">
                Technical support services for our themes are{" "}
                <strong>
                  available Saturday to Thursday 9 AM - 5 PM (GMT+6)
                </strong>
              </p>
            </div>
            <div>
              <h3 className="h4 mb-4">Additional Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    className="btn btn-link-2"
                    href="https://docs.themefisher.com"
                  >
                    View Our Documentation{" "}
                    <FiArrowRight className="mt-1 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link className="btn btn-link-2" href="/faq">
                    View Our FAQ <FiArrowRight className="mt-1 ml-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <Image
            src="/images/ticket-submitted.svg"
            alt="success"
            height="120"
            width="145"
            className="mx-auto mb-6"
          />
          <h3 className="mb-3">Ticket Submitted</h3>
          <p>
            We have received your ticket. We will get back to you as soon as
            possible.
          </p>
          <a
            className="btn btn-primary btn-sm mt-5"
            href={`/dashboard/tickets?created=true`}
          >
            View Tickets
          </a>
        </div>
      )}
    </>
  );
};

export default TicketForm;
