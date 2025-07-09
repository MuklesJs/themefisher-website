import bundles from "@/config/bundle.json";
import useHandlePurchase from "hooks/useHandlePurchase";
import usePurchasedProducts from "hooks/usePurchasedProducts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Spinner from "./Spinner";

const UpgradePromotion = () => {
  const [mounted, setMounted] = useState(false);
  const [loader, setLoader] = useState(false);
  const { purchasedBundles, purchasedProducts, totalEarningsByType } =
    usePurchasedProducts();

  // last purchased product type
  const lastProductType =
    purchasedProducts.length > 0
      ? purchasedProducts[purchasedProducts.length - 1].type
      : "";

  const bundle = lastProductType && bundles[`${lastProductType}_bundle`];

  // Find the elite package
  const elitePackage = bundle?.packages?.find((pkg) => pkg.package === "elite");

  // set mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use earnings by type for pricing
  const earningsForType = totalEarningsByType
    ? totalEarningsByType(lastProductType)
    : 0;

  const bundleInfo = {
    title: bundle.title,
    image: bundle.image,
    price: elitePackage ? elitePackage.price - earningsForType : 0,
  };

  const addBundleToCart = useHandlePurchase({
    slug: bundle.slug,
    package: "elite",
    support: elitePackage?.support,
    product: bundleInfo,
  });

  const handleBundlePurchase = async () => {
    setLoader(true);
    addBundleToCart();
  };

  return (
    <>
      {mounted &&
        earningsForType > 0 &&
        elitePackage &&
        earningsForType < elitePackage.price &&
        purchasedBundles?.length === 0 && (
          <div
            className={`rounded-lg mx-0 row bg-white shadow p-4 lg:p-8 mb-10 relative overflow-hidden`}
          >
            <div className="md:col-4 relative z-10 mb-6 md:mb-0">
              {/* badge */}
              <span className="bg-secondary/50 inline-block py-0.5 px-5 text-sm rounded-xl mb-4">
                One Time Offer
              </span>
              <h3 className="mb-3 h4 font-primary capitalize">
                Unlock All {lastProductType} Themes
              </h3>
              <p className="mb-4 text-sm">
                As a valued single theme user, You can upgrade to{" "}
                <strong className="capitalize">{lastProductType} Bundle</strong>{" "}
                for just{" "}
                <strong className="text-xl text-dark">
                  $
                  {Number(
                    Number(elitePackage?.price) - earningsForType,
                  ).toFixed(2)}
                  !
                </strong>{" "}
                Get all current and future releases - forever.
              </p>
              <div className="mb-4">
                {elitePackage.price_before && (
                  <s>${Number(elitePackage.price_before).toFixed(2)}</s>
                )}
                <span className="mx-2 text-xl text-primary">
                  ${Number(elitePackage.price - earningsForType).toFixed(2)}
                </span>
                <span className="bg-primary/20 inline-block py-0.5 px-3 text-xs rounded-xl">
                  Save $
                  {Number(
                    Number(elitePackage.price_before) -
                      Number(elitePackage.price - earningsForType),
                  ).toFixed(2)}
                </span>
              </div>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleBundlePurchase}
              >
                {loader ? (
                  <>
                    Please Wait
                    <Spinner />
                  </>
                ) : (
                  <span className="capitalize">
                    Upgrade To {lastProductType} Bundle
                  </span>
                )}
              </button>
            </div>
            <div className="md:col-7 relative z-10">
              <h3 className="text-lg font-medium mb-3 font-primary">
                What's Included
              </h3>
              <ul className="pl-0 mb-4 xl:columns-2 *:mb-3">
                <li className="capitalize">
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Access All {lastProductType} Themes
                </li>
                <li>
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Upcoming themes
                </li>
                <li>
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Create Unlimited Projects
                </li>
                <li>
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Lifetime Access
                </li>
                <li>
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Premium Customer Support
                </li>
                <li>
                  <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                  Free Updates
                </li>
              </ul>
              <small>
                Note: This offer is exclusively for our existing customers who
                purchased single product. We're offering this to you for a
                limited time only. Don't miss out.
              </small>
            </div>
            <Image
              height={300}
              width={300}
              src="/images/dashboard-bundle-promotion-desktop.png"
              alt="bundle-promotion"
              className="hidden h-full w-auto md:block absolute -right-[16px] bottom-0"
            />
          </div>
        )}
    </>
  );
};

export default UpgradePromotion;
