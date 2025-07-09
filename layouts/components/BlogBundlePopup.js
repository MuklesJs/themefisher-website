import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogBundlePopup = ({ bundle }) => {
  const [welcomePopup, setWelcomePopup] = useState(false);

  useEffect(() => {
    if (bundle) {
      setTimeout(() => {
        setWelcomePopup(true);
      }, 15000);
    }

    return () => {
      clearTimeout();
    };
  }, [bundle]);

  // press escape to close popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setWelcomePopup(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
        welcomePopup ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <span
        className="absolute top-0 left-0 -z-[1] h-full w-full"
        onClick={() => setWelcomePopup(false)}
      />
      <div className="overflow-hidden">
        <div
          className={`absolute left-1/2 top-1/2 w-[96%] max-w-[900px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-lg shadow-lg ${bundle == "astro" ? "bg-white" : bundle == "nextjs" ? "bg-white" : bundle == "hugo" ? "bg-[#fff7fa]" : bundle == "tailwind" ? "bg-[#f6fcfd]" : bundle == "bootstrap" ? "bg-[#fcf8ff]" : "bg-white"}`}
        >
          <div className="max-h-[calc(100vh_-_100px)] overflow-y-auto row">
            <div className="lg:col-6 pl-8 py-7">
              <div className="flex items-center mb-8 flex-wrap">
                <Image
                  height={40}
                  width={40}
                  src={`/images/icons/${bundle}.svg`}
                  alt="icon image"
                />
                <h2 className="text-h3 ml-2 capitalize whitespace-nowrap">
                  {bundle} Bundle
                </h2>
                <span className="text-h5 ml-3 text-[#f53235]">
                  (
                  {bundle == "astro"
                    ? "60"
                    : bundle == "nextjs"
                      ? "35"
                      : bundle == "hugo"
                        ? "64"
                        : bundle == "tailwind"
                          ? "45"
                          : bundle == "bootstrap"
                            ? "50"
                            : "50"}
                  % OFF)
                </span>
              </div>
              <ul className="mb-10 space-y-2">
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  Access To All Existing Themes
                </li>
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  All Upcoming Themes
                </li>
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  Unlimited Projects
                </li>
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  Lifetime Access & Free Updates
                </li>
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  Priority Support
                </li>
                <li>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1 mr-2"
                  >
                    <path
                      d="M19.7486 2.39822L18.1481 0.797723C17.8526 0.502973 17.3756 0.502973 17.0808 0.797723L7.48456 10.394L2.92006 5.79647C2.62531 5.50172 2.14831 5.50172 1.85281 5.79647L0.252313 7.39697C-0.0424375 7.69247 -0.0424375 8.16947 0.252313 8.46422L6.94531 15.2022C7.24006 15.497 7.71781 15.497 8.01256 15.2022L19.7486 3.46547C20.0433 3.17147 20.0433 2.69297 19.7486 2.39822Z"
                      fill="#23C856"
                    />
                  </svg>{" "}
                  One-Time Payment
                </li>
              </ul>
              <Link
                href={`/bundles/${bundle}-bundle?utm_source=blog&utm_medium=popup&utm_campaign=themes_bundle_promotion`}
                className={`btn px-12 text-white ${bundle == "astro" ? "hover:bg-[#f53235] bg-[#f53235]" : bundle == "nextjs" ? "hover:bg-[#000] bg-[#000]" : bundle == "hugo" ? "hover:bg-[#fa4088] bg-[#fa4088]" : bundle == "tailwind" ? "hover:bg-[#2ab6d5] bg-[#2ab6d5]" : bundle == "bootstrap" ? "hover:bg-[#7412f6] bg-[#7412f6]" : "hover:bg-[#f53235] bg-[#f53235]"}`}
              >
                Get The Bundle
              </Link>
              <button
                className="px-9 mt-2 block"
                onClick={() => setWelcomePopup(false)}
              >
                I'm not ready yet
              </button>
            </div>
            <div className="lg:col-6 hidden lg:block">
              <svg
                className="absolute top-1/2 -translate-y-1/2 right-0 -z-[1]"
                width="428"
                height="495"
                viewBox="0 0 428 495"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="286.5"
                  cy="248.5"
                  r="286.5"
                  fill={`${
                    bundle == "astro"
                      ? "#fa5c02"
                      : bundle == "nextjs"
                        ? "#1f87bd"
                        : bundle == "hugo"
                          ? "#fa4088"
                          : bundle == "tailwind"
                            ? "#2ab6d5"
                            : bundle == "bootstrap"
                              ? "#7412f6"
                              : "#f53235"
                  }`}
                  fillOpacity="0.15"
                />
              </svg>
              <Image
                height={560}
                width={500}
                className="h-full w-auto"
                src={`/images/blog-popup/${bundle}-bundle.png`}
                alt="bundle image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBundlePopup;
