import Spinner from "@/components/Spinner";
import bundles from "@/config/bundle.json";
import products from "@/json/products.json";
import useHandlePurchase from "hooks/useHandlePurchase";
import { markdownify } from "lib/utils/textConverter";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PaymentOptions from "../Checkout/PaymentOptions";

//  Description map for each package
const descMap = {
  starter: "For individuals developing their next project.",
  plus: "For developers & startups managing multiple projects.",
  elite: "For large teams & agencies handling many projects.",
};

//  Feature list for each package
const FEATURES = {
  starter: [
    (count, type) => `${count}+ ${type} Premium Themes`,
    () => "Get Upcoming Themes for 12 Months",
    () => "Up to 1 User",
    () => "1 Project / Each Theme",
    () => "3 Months Premium Support",
    () => "12 Months Access & Free Updates",
    () => "Commercial Project License",
  ],
  plus: [
    (count, type) => `${count}+ ${type} Premium Themes`,
    () => "Get Upcoming Themes for Lifetime",
    () => "Up to 5 Users",
    () => "10 Projects / Each Theme",
    () => "6 Months Premium Support",
    () => "Lifetime Access & Free Updates",
    () => "Commercial Project License",
  ],
  elite: [
    (count, type) => `${count}+ ${type} Premium Themes`,
    () => "Get Upcoming Themes for Lifetime",
    () => "Up to 20 Users",
    () => "Unlimited Projects / Each Theme",
    () => "6 Months Premium Support",
    () => "Lifetime Access & Free Updates",
    () => "Commercial Project License",
  ],
};

// Card for each package
function BundleCard({
  packageInfo,
  features,
  onPurchase,
  loading,
  desc,
  highlight,
  count,
  type,
}) {
  const price = packageInfo ? parseFloat(packageInfo.price).toFixed(0) : "--";
  const priceBefore = packageInfo
    ? parseFloat(packageInfo.price_before).toFixed(0)
    : "--";
  const savePercent =
    packageInfo && packageInfo.price_before
      ? parseInt(100 - (packageInfo.price / packageInfo.price_before) * 100)
      : "--";

  return (
    <div>
      <div
        className={`relative h-full flex flex-col border rounded-xl bg-white shadow-sm ${
          highlight ? "border-primary shadow-lg z-10" : "border-gray-200"
        }`}
      >
        {highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow">
            MOST POPULAR
          </div>
        )}
        <div className="p-6">
          <h2 className={`mb-1 text-xl font-bold`}>{packageInfo?.title}</h2>
          <div className="mb-5 text-muted text-sm">{desc}</div>
          <div className="text-sm text-[#F25757] mb-1">
            ORIGINALLY <span className="line-through">${priceBefore}</span>
          </div>
          <div className="flex items-end mb-2">
            <span className="text-4xl font-bold text-black">${price}</span>
            <span className="ml-1">
              {savePercent && (
                <span className="bg-[#DFF6DD] text-[#23C856] font-bold px-2 py-0.5 rounded text-xs">
                  {savePercent}% OFF
                </span>
              )}

              <small className="block text-[12px]">+ Local Taxes</small>
            </span>
          </div>
          <p className="text-sm mb-1">{packageInfo?.subtitle}</p>
          <button
            onClick={onPurchase}
            className={`btn btn-sm btn-dark w-full my-4`}
          >
            {loading ? (
              <>
                Please Wait
                <Spinner />
              </>
            ) : (
              <>Buy Now</>
            )}
          </button>
          <ul className="space-y-2 mt-2 text-left text-sm">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <FaCheck className="text-[#23C856] mr-2 text-sm mt-0.5" />
                {markdownify(
                  feature(
                    i === 0 ? count : undefined,
                    i === 0 ? type : undefined,
                  ),
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BundlePricing({ type }) {
  const bundle = Object.values(bundles).find(
    (b) => b.type === type || (type === "themefisher" && b.type === "all"),
  );

  const allProducts =
    type === "themefisher"
      ? products.filter((product) => product.frontmatter.price !== 0)
      : products.filter(
          (product) =>
            product.frontmatter.type === type &&
            product.frontmatter.price !== 0,
        );

  const packages = ["starter", "plus", "elite"];
  const [loader, setLoader] = useState({
    starter: false,
    plus: false,
    elite: false,
  });

  // Helper to merge package info with bundle image
  const getPackageInfo = (pkgName) => {
    const pkg = bundle?.packages?.find((p) => p.package === pkgName);
    return pkg
      ? { ...pkg, title: bundle?.title, image: bundle?.image }
      : undefined;
  };

  // Get support value from package info
  const getSupport = (pkgName) => {
    const pkg = bundle?.packages?.find((p) => p.package === pkgName);
    return pkg?.support;
  };

  const handlePurchases = {
    starter: useHandlePurchase({
      slug: bundle?.slug,
      package: "starter",
      support: getSupport("starter"),
      product: getPackageInfo("starter"),
    }),
    plus: useHandlePurchase({
      slug: bundle?.slug,
      package: "plus",
      support: getSupport("plus"),
      product: getPackageInfo("plus"),
    }),
    elite: useHandlePurchase({
      slug: bundle?.slug,
      package: "elite",
      support: getSupport("elite"),
      product: getPackageInfo("elite"),
    }),
  };

  const handlePurchase = (pkg) => {
    setLoader({
      starter: pkg === "starter",
      plus: pkg === "plus",
      elite: pkg === "elite",
    });
    handlePurchases[pkg]();
  };

  return (
    <section className="bg-theme-light section" id="bundle-pricing">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-2">Pick Your Plan</h2>
          <p className="text-muted">
            Get access to our entire collection of current and future themes
            with a single payment.
          </p>
        </div>
        <div className="row row-cols-1 md:row-cols-2 lg:row-cols-3 gx-5 gy-5 justify-center mb-12">
          {packages.map((pkg) => {
            const pkgInfo = bundle?.packages?.find((p) => p.package === pkg);
            const displayType =
              type === "themefisher" ? "All" : bundle?.title?.split(" ")[0];
            const features = FEATURES[pkg];
            return (
              <BundleCard
                key={pkg}
                packageInfo={pkgInfo}
                features={features}
                onPurchase={() => handlePurchase(pkg)}
                loading={loader[pkg]}
                desc={descMap[pkg]}
                highlight={pkg === "plus"}
                count={allProducts.length}
                type={displayType}
              />
            );
          })}
        </div>
        <PaymentOptions />
      </div>
    </section>
  );
}
