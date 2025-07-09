import Link from "next/link";
import { useEffect, useState } from "react";

const CustomDevPage = () => {
  const [loading, setLoading] = useState(true);
  const [customDevelopmentQuote, setCustomDevelopmentQuote] = useState(true);

  // set data on session storage
  useEffect(() => {
    const cdState = sessionStorage.getItem("customDevelopmentQuote");
    if (cdState) {
      setCustomDevelopmentQuote(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [customDevelopmentQuote]);

  // sessionStorage evemt
  const sessionStorageHandler = () => {
    setCustomDevelopmentQuote(false);
    sessionStorage.setItem("customDevelopmentQuote", false);
  };

  return (
    <>
      {/* cookie box */}
      <div
        className={`service-popup ${loading ? "invisible" : "visible"} ${
          customDevelopmentQuote ? "block" : "hidden"
        }`}
      >
        <h4 className="mb-2">Need Custom Development?</h4>
        <p className="text-muted text-sm mb-2">
          Need custom theme, theme customization, or complete website
          development services from scratch?
        </p>
        <Link
          className="btn btn-primary btn-sm btn-service-popup text-sm mt-2"
          href="/custom-development"
        >
          Get a Quote
        </Link>
        <button
          className="-right-2 -top-2 absolute text-theme-dark hover:text-red-500 transition-all"
          type="button"
          onClick={sessionStorageHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={22}
            width={22}
          >
            <path
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default CustomDevPage;
