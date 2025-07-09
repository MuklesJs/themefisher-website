import Base from "@/layouts/Baseof";
import { markdownify } from "@/lib/utils/textConverter";
import axios from "axios";
import Axios from "lib/axios";
import { getListPage } from "lib/contentParser";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ServiceForm = ({ getAQuote }) => {
  const {
    title,
    subtitle,
    what_next,
    meta_title,
    description,
    image,
    noindex,
    chat,
    success_message,
  } = getAQuote.frontmatter;

  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

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
        "https://formsubmit.co/ajax/zeonstudio@themefisher.thrivedesk.email",
        {
          _subject: `THEMEFISHER: ${service.value}`,
          full_name: full_name.value,
          email: email.value,
          service: service.value,
          timeline: timeline.value,
          budget: budget.value,
          technology: technology.value,
          company: company.value,
          role: role.value,
          website: website.value,
          how_to_find_us: how_to_find_us.value,
          details: details.value,
        },
        {
          headers: { "Content-type": "application/json" },
        },
      );
      setSubmitted(response.data.success);
      setLoader(false);
    } catch (error) {
      setSubmitted(error);
      setLoader(false);
    }
  };

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
      chat={chat}
      popupPage={true}
    >
      <section className={`section relative pt-14`}>
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 xl:col-6">
              <div className="section-head mb-5 text-center">
                {markdownify(title, "h2", "section-title mb-4")}
                {subtitle && markdownify(subtitle, "p", "mb-10")}
              </div>
            </div>
          </div>
          <div className="row justify-center">
            <div className="mb-8 lg:col-7 lg:mb-0">
              <div className="rounded-xl px-10 py-12 shadow">
                {!submitted ? (
                  <form
                    className="row gy-4 items-center"
                    id="service-form"
                    method="POST"
                    onSubmit={formHandler}
                  >
                    <div className="md:col-6">
                      <label htmlFor="full_name" className="form-label">
                        Full Name
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="full_name"
                        name="full_name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="email" className="form-label">
                        Email
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        id="email"
                        name="email"
                        placeholder="johndoe@email.com"
                        required
                      />
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="role" className="form-label">
                        Your Role
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="role"
                        name="role"
                        placeholder="Co-founder"
                        required
                      />
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="company" className="form-label">
                        Company
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="company"
                        name="company"
                        placeholder="Themefisher"
                      />
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="service" className="form-label">
                        Service Package
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="form-select"
                        required
                      >
                        <option disabled selected value="">
                          Choose Services
                        </option>
                        <option value="Complete Website Development">
                          Complete Website Development
                        </option>
                        <option value="Theme Customization">
                          Theme Customization
                        </option>
                        <option value="Custom Theme Development">
                          Custom Theme Development
                        </option>
                        <option value="Website Redesign">
                          Website Redesign
                        </option>
                        <option value="Website Migration">
                          Website Migration
                        </option>
                        <option value="Website Maintenance">
                          Website Maintenance
                        </option>
                        <option value="CMS Setup">CMS Setup</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="technology" className="form-label">
                        Technology
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="technology"
                        name="technology"
                        className="form-select"
                        required
                      >
                        <option disabled selected value="">
                          Choose Technology
                        </option>
                        <option value="nextjs">Next js</option>
                        <option value="hugo">Hugo</option>
                        <option value="astro">Astro</option>
                        <option value="jekyll">Jekyll</option>
                        <option value="gatsby">Gatsby</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-6">
                      <label htmlFor="website" className="form-label">
                        Website
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="website"
                        name="website"
                        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                        placeholder="https://examplesite.com"
                      />
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="budget" className="form-label">
                        Estimate Budget
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-select"
                        required
                      >
                        <option disabled selected value="">
                          Choose Budget
                        </option>
                        <option value="Around $500">Around $500</option>
                        <option value="$500 - $1000">$500 - $1000</option>
                        <option value="$1000 - $2000">$1000 - $2000</option>
                        <option value="$2000 - $3000">$2000 - $3000</option>
                        <option value="$3000 - $4000">$3000 - $4000</option>
                        <option value="$4000 - $5000">$4000 - $5000</option>
                        <option value="$5000+">$5000+</option>
                      </select>
                    </div>

                    <div className="md:col-6">
                      <label htmlFor="timeline" className="form-label">
                        Timeline
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className="form-select"
                        required
                      >
                        <option disabled selected value="">
                          Choose A Timeline
                        </option>
                        <option value=" Less than 1 week ">
                          Less than 1 week{" "}
                        </option>
                        <option value="1 - 2 weeks">1 - 2 weeks</option>
                        <option value="2 - 3 weeks">2 - 3 weeks</option>
                        <option value="3 - 4 weeks">3 - 4 weeks</option>
                        <option value="More than 1 month">
                          More than 1 month
                        </option>
                      </select>
                    </div>
                    <div className="md:col-6">
                      <label htmlFor="budget" className="form-label">
                        How Did You Find Us
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="how_to_find_us"
                        name="how_to_find_us"
                        className="form-select"
                        required
                      >
                        <option disabled selected value="">
                          Choose A Way
                        </option>
                        <option value="search-engine">
                          Search Engine (Google, Bing, etc.)
                        </option>
                        <option value="github">Github</option>
                        <option value="social-media">Social Media</option>
                        <option value="email">Email</option>
                        <option value="developer-forum">Developer Forum</option>
                        <option value="blog-post">Blog Post</option>
                        <option value="template-user">
                          I'm Your Template User
                        </option>
                        <option value="colleague / friend">
                          Colleague / Friend
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="details" className="form-label">
                        Tell Us About Your Project
                        <span className="lh-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <textarea
                        name="details"
                        id="details"
                        className="form-input py-4"
                        rows="5"
                        required
                        placeholder="Tell us a bit about your project..."
                      ></textarea>
                    </div>
                    <div className="col-12 text-end">
                      <button className="btn btn-primary no-wrap" type="submit">
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
                  </form>
                ) : (
                  <div className="text-center">
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
                    {markdownify(success_message, "p")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {what_next.enable && (
        <section className="section pt-0">
          <div className="container">
            <div className="row justify-center">
              <div className="lg:col-10 xl:col-6">
                <div className="section-head mb-5 text-center">
                  {markdownify(what_next.title, "h2", "section-title")}
                  {subtitle && markdownify(subtitle, "p")}
                </div>
              </div>
            </div>
            <div className="row">
              {what_next.steps.map((item) => (
                <div
                  key={item.title}
                  className="mb-4 text-center lg:col-4 lg:mb-0"
                >
                  <span className="">{item.number}</span>
                  <h3 className="h4">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Base>
  );
};

export default ServiceForm;

export const getStaticProps = async () => {
  const getAQuote = await getListPage(
    "content/landing-pages/custom-development.md",
  );

  return {
    props: {
      getAQuote: getAQuote,
    },
  };
};
