import useDownloadedProducts from "hooks/useDownloadedProducts";
import usePurchasedProducts from "hooks/usePurchasedProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import BundlePromotionWidget from "./BundlePromotionWidget";
import LicensePopup from "./LicensePopup";

const ProductMeta = ({ singleProduct, downloadData, slug }) => {
  const { purchasedProducts } = usePurchasedProducts();
  const { handleDownload } = useDownloadedProducts();
  const { frontmatter } = singleProduct;
  const { title, type, price, download, archive } = frontmatter;
  const [isLicensePopupOpen, setIsLicensePopupOpen] = useState(false);

  // close bundle popup
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsBundlePopupOpen(false);
      }
    });
  }, []);

  const premiumFeatures = [
    "One-time Payment",
    "Instant Access",
    "Commercial License",
    "Lifetime Free Updates",
  ];

  const freeFeatures = [
    "Instant Access",
    "MIT License",
    "Community Support",
    "Free Updates",
  ];

  return (
    <div className="p-[30px_28px] mb-6 border rounded-md">
      <h1 className="text-center text-dark font-semibold text-2xl flex flex-wrap items-center">
        {title}{" "}
        {archive && (
          <>
            <span
              className="text-2xl px-3 text-error bg-error/10 rounded font-semibold scale-[0.8] leading-[2]"
              id="archived"
            >
              Archived
            </span>
          </>
        )}
      </h1>
      <Tooltip
        anchorSelect="#archived"
        place="top"
        content="No longer development support"
      />

      <ul className="mt-4 mb-8 space-y-2">
        {price === 0
          ? freeFeatures.map((feature, index) => (
              <li key={index}>
                <IoIosCheckmarkCircleOutline className="mr-1 text-light -mt-0.5" />
                <span className="text-[#405460]">{feature}</span>
              </li>
            ))
          : premiumFeatures.map((feature, index) => (
              <li key={index}>
                <IoIosCheckmarkCircleOutline className="mr-1 text-light -mt-0.5" />
                <span className="text-[#405460]">{feature}</span>
              </li>
            ))}
      </ul>

      <ul className="mt-3 mb-0">
        <li>
          <Link
            href={`/demo?theme=${slug}`}
            className="btn btn-demo btn-outline-primary mb-4 w-full"
          >
            Live Preview
          </Link>
        </li>
        <li>
          {purchasedProducts?.find((d) => d.slug === slug) ? (
            <button
              className="btn btn-primary w-100 block w-full text-center"
              onClick={() => handleDownload(slug, download)}
            >
              Download Now
            </button>
          ) : price === 0 ? (
            <button
              className="btn btn-primary btn-download-free w-full"
              onClick={() => setIsLicensePopupOpen(true)}
            >
              Get It For FREE
            </button>
          ) : (
            <a
              href="#product-pricing"
              className="btn btn-primary btn-download-premium w-full"
            >
              Get it for ${parseFloat(price).toFixed(0)}
            </a>
          )}
        </li>
      </ul>
      {!purchasedProducts?.find((d) => d.slug === slug) &&
        price !== 0 &&
        type !== "framer" && <BundlePromotionWidget type={type} />}

      {price === 0 && (
        <LicensePopup
          isLicensePopupOpen={isLicensePopupOpen}
          setIsLicensePopupOpen={setIsLicensePopupOpen}
          singleProduct={singleProduct}
          downloadData={downloadData}
          type={type}
          slug={slug}
        />
      )}
    </div>
  );
};

export default ProductMeta;
