import Spinner from "@/components/Spinner";
import Axios from "@/lib/axios";
import useHandlePurchase from "hooks/useHandlePurchase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import UserLeadPopup from "./UserLeadPopup";

const LicensePopup = ({
  singleProduct,
  isLicensePopupOpen,
  setIsLicensePopupOpen,
  downloadData,
  type,
  slug,
}) => {
  const { frontmatter } = singleProduct;
  const { title, image, download, price } = frontmatter;
  const router = useRouter();

  // handle single product add to cart
  const singleProductInfo = {
    title: title,
    image: image,
    price: 17.0,
  };
  const addSingleProductToCart = useHandlePurchase({
    slug,
    package: "single",
    support: "3-months",
    product: singleProductInfo,
  });

  const [isUserLeadPopup, setIsUserLeadPopup] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [loader, setLoader] = useState({
    free: false,
    commercial: false,
  });

  // downloadData
  const handleUpdate = async () => {
    setLoader({ ...loader, free: true });
    const updateDownload = await Axios.put(`free-theme/${slug}`, {
      download: downloadData,
      date: new Date(),
    });
    if (updateDownload.status === 200) {
      setTimeout(() => {
        setLoader({ ...loader, free: false });
      }, 5000);
      router.push(download);
    }
  };

  const handlePopup = () => {
    setIsUserLeadPopup(true);
    setIsLicensePopupOpen(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 80) {
      setReachedBottom(true);
    } else {
      setReachedBottom(false);
    }
  };

  const handleSinglePurchase = async () => {
    setLoader({ ...loader, commercial: true });
    addSingleProductToCart();
  };

  return isUserLeadPopup ? (
    <UserLeadPopup
      isUserLeadPopup={isUserLeadPopup}
      setIsUserLeadPopup={setIsUserLeadPopup}
      singleProduct={singleProduct}
      downloadData={downloadData}
      slug={slug}
    />
  ) : (
    <div
      className={`${
        reachedBottom ? "reached-bottom" : ""
      } bundle-popup fixed left-0 top-0 z-[999999] h-screen w-screen backdrop-blur backdrop-brightness-[0.65] ${
        isLicensePopupOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <span
        className="absolute left-0 top-0 -z-[1] h-full w-full"
        onClick={() => setIsLicensePopupOpen(false)}
      />
      <div className="bundle-popup-shadow" />
      <div
        onScroll={handleScroll}
        className={`bundle-popup-inner max-w-[800px]`}
      >
        <div className="row m-0 text-center">
          <div className="bg-theme-light px-8 py-10 md:col-5 md:border-r md:border-border">
            <div className="justify-center sm:flex md:block">
              <div className="flex-shrink-0">
                <Link
                  href={`/products/${slug}`}
                  className="inline-block overflow-hidden rounded-md shadow-lg "
                  style={{ lineHeight: 0 }}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                >
                  <Image
                    width="208"
                    height="156"
                    src={image}
                    alt={`${title} thumbnail`}
                    blurDataURL={image}
                  />
                </Link>
              </div>
              <div className="ml-0 mt-5 text-center sm:ml-8 sm:mt-0 sm:text-left md:ml-0 md:mt-5 md:text-center">
                <h3 className="h5 lh-1 mb-2">
                  <a
                    href={`/products/${slug}`}
                    className="lh-1 font-secondary text-dark"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    {title}
                  </a>
                </h3>

                <strong className="mt-2 block font-secondary text-2xl text-light">
                  Free
                </strong>

                <ul
                  className="mt-6 border-t-2 font-[500] text-dark sm:mt-2 md:mt-6"
                  style={{
                    borderImageSlice: 1,
                    borderStyle: "solid",
                    borderImageSource:
                      "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #e8e8e8 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                  }}
                >
                  <li
                    className="border-b-2 py-2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #e8e8e8 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
                    MIT license
                  </li>
                  <li
                    className="border-b-2 py-2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #e8e8e8 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
                    Documentation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="px-4 py-10 md:col-7 sm:px-8">
            <div className="justify-center sm:flex md:block">
              <div className="flex-shrink-0">
                <Link
                  href={`/products/${slug}`}
                  className="inline-block overflow-hidden rounded-md shadow-lg "
                  style={{ lineHeight: 0 }}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                >
                  <Image
                    width="208"
                    height="156"
                    src={image}
                    alt={`${title} thumbnail`}
                    blurDataURL={image}
                  />
                </Link>
              </div>
              <div className="ml-0 mt-5 text-center sm:ml-8 sm:mt-0 sm:text-left md:ml-0 md:mt-5 md:text-center">
                <h3 className="h5 lh-1 mb-2">
                  <a
                    href={`/products/${slug}`}
                    className="lh-1 font-secondary text-dark"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    {title}
                  </a>
                </h3>

                <strong className="mt-2 block font-secondary text-2xl text-primary">
                  $17.00
                </strong>

                <ul
                  className="mx-auto mt-6 w-full max-w-[430px] flex-wrap border-t-2 font-[500] text-dark sm:flex sm:text-left"
                  style={{
                    borderImageSlice: 1,
                    borderStyle: "solid",
                    borderImageSource:
                      "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                  }}
                >
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    Commercial License
                  </li>
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    Premium Support
                  </li>
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    Lifetime Update
                  </li>
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    Documentation
                  </li>
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    No Copyright
                  </li>
                  <li
                    className="border-b-2 py-2 sm:w-1/2"
                    style={{
                      borderImageSlice: 1,
                      borderStyle: "solid",
                      borderImageSource:
                        "linear-gradient(270deg, rgba(225, 225, 225, 0) 8.63%, #F3F3F3 49.78%, rgba(225, 225, 225, 0) 91.12%)",
                    }}
                  >
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
                    </svg>
                    Removable License
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 bottom-0 bg-white md:sticky">
            <div className="row">
              <div className="bundle-popup-bottom flex flex-col items-center justify-center border-r border-r-border bg-theme-light md:col-5">
                <button
                  className="btn btn-outline-primary btn-free-download btn-sm my-3 justify-center"
                  disabled={loader.free}
                  onClick={() =>
                    type === "astro" || type === "nextjs"
                      ? handlePopup()
                      : handleUpdate()
                  }
                >
                  {loader.free ? (
                    <>
                      Please Wait
                      <Spinner />
                    </>
                  ) : (
                    <span>Free Download</span>
                  )}
                </button>
              </div>

              <div className="bundle-popup-bottom bg-white md:col-7">
                <button
                  className="btn btn-primary w-[300px] max-w-full btn-commercial-license my-3 justify-center"
                  onClick={handleSinglePurchase}
                  disabled={loader.commercial}
                >
                  {loader.commercial ? (
                    <>
                      Please Wait
                      <Spinner />
                    </>
                  ) : (
                    <span>Buy Commercial License</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePopup;
