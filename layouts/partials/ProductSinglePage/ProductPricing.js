import Spinner from "@/components/Spinner";
import bundles from "@/config/bundle.json";
import products from "@/json/products.json";
import useHandlePurchase from "hooks/useHandlePurchase";
import { markdownify } from "lib/utils/textConverter";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Select from "react-select";
import PaymentOptions from "../Checkout/PaymentOptions";

// Description map for each bundle package
const descMap = {
  starter: "For individuals developing their next project.",
  plus: "For developers & startups managing multiple projects.",
  elite: "For large teams & agencies handling many projects.",
};

// Feature list for each bundle package
const FEATURES = {
  starter: [
    () => "",
    () => "Get Upcoming Themes for 12 Months",
    () => "Up to 1 User",
    () => "1 Project / Each Theme",
    () => "3 Months Premium Support",
    () => "12 Months Access & Free Updates",
    () => "Commercial Project License",
  ],
  plus: [
    () => "",
    () => "Get Upcoming Themes for Lifetime",
    () => "Up to 5 Users",
    () => "10 Projects / Each Theme",
    () => "6 Months Premium Support",
    () => "Lifetime Access & Free Updates",
    () => "Commercial Project License",
  ],
  elite: [
    () => "",
    () => "Get Upcoming Themes for Lifetime",
    () => "Up to 20 Users",
    () => "Unlimited Projects / Each Theme",
    () => "6 Months Premium Support",
    () => "Lifetime Access & Free Updates",
    () => "Commercial Project License",
  ],
};

// Features for single product
const SINGLE_FEATURES = [
  () => "1 User",
  () => "3 Months Premium Support",
  () => "Personal & Commercial License",
  () => "Lifetime Free Updates",
  () => "Upto 5 Projects",
];

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected && "#0A1E2B",
    "&:active": {
      background: state.isSelected ? "#0A1E2B" : "#eee",
    },
    "&:hover": {
      background: state.isSelected ? "#0A1E2B" : "#eee",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 5,
    borderColor: state.isFocused ? "#0A1E2B" : "#dedede",
    boxShadow: null,
    "&:hover": {
      borderColor: state.isFocused ? "#0A1E2B" : "#dedede",
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
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
};

// Card for each pricing option
function PricingCard({
  title,
  price,
  priceBefore,
  savePercent,
  subtitle,
  desc,
  features,
  onPurchase,
  loading,
  highlight,
  isSingle,
  selectValue,
  onSelectChange,
}) {
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
          <h2 className="mb-1 text-xl font-bold">{title}</h2>
          <div className="mb-5 text-muted text-sm">{desc}</div>
          {priceBefore && (
            <div className="text-sm text-[#F25757] mb-1">
              ORIGINALLY <span className="line-through">${priceBefore}</span>
            </div>
          )}
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
          {subtitle && <p className="text-sm mb-1">{subtitle}</p>}
          {/* Single pricing select box */}
          {isSingle && (
            <div className="mt-2 -mb-2">
              <Select
                options={[
                  { value: "single", label: "Single Project" },
                  { value: "multiple", label: "Multiple Projects" },
                ]}
                value={
                  selectValue === "multiple"
                    ? { value: "multiple", label: "Multiple Projects" }
                    : { value: "single", label: "Single Project" }
                }
                onChange={onSelectChange}
                isSearchable={false}
                styles={selectStyle}
              />
            </div>
          )}
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
                {getFeatureIcon({ isSingle, i, selectValue })}
                {typeof feature === "function"
                  ? markdownify(feature())
                  : markdownify(feature)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Helper to decide which icon to show for each feature
function getFeatureIcon({ isSingle, i, selectValue }) {
  if (isSingle && i === 4) {
    return selectValue === "multiple" ? (
      <FaCheck className="text-[#23C856] mr-2 text-sm mt-0.5" />
    ) : (
      <FaTimes className="text-[#F25757] mr-2 text-sm mt-0.5" />
    );
  }
  // All other features: always check
  return <FaCheck className="text-[#23C856] mr-2 text-sm mt-0.5" />;
}

export default function ProductPricing({ singleProduct, slug, type }) {
  // Find bundle for this product type
  const bundle =
    Object.values(bundles).find(
      (b) => b.type === type || (type === "themefisher" && b.type === "all"),
    ) || Object.values(bundles)[0];

  const allProducts = products.filter(
    (product) => product.frontmatter.type === type && product.frontmatter.price,
  );

  const packages = ["starter", "plus", "elite"];
  const [loader, setLoader] = useState({
    single: false,
    starter: false,
    plus: false,
    elite: false,
  });
  const [singleOption, setSingleOption] = useState("single");

  // Helper to merge package info with bundle image
  const getPackageInfo = (pkgName) => {
    const pkg = bundle?.packages?.find((p) => p.package === pkgName);
    return pkg
      ? { ...pkg, title: bundle?.title, image: bundle?.image }
      : undefined;
  };

  // Prepare minimal product info for purchase
  const getSingleProductForPurchase = () => {
    const { title, image, price } = singleProduct.frontmatter;
    return {
      title,
      image,
      price: singleOption === "multiple" ? price + 20 : price,
      slug: slug,
    };
  };

  // Get support value from package info
  const getSupport = (pkgName) => {
    const pkg = bundle?.packages?.find((p) => p.package === pkgName);
    return pkg?.support;
  };

  // Purchase handlers
  const handlePurchases = {
    single: useHandlePurchase({
      slug: slug,
      package: singleOption === "multiple" ? "multiple" : "single",
      support: "3-months",
      product: getSingleProductForPurchase(),
    }),
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
      single: pkg === "single",
      starter: pkg === "starter",
      plus: pkg === "plus",
      elite: pkg === "elite",
    });
    handlePurchases[pkg]();
  };

  // Single product pricing info
  const baseSinglePrice = singleProduct.frontmatter.price;
  const singlePrice =
    singleOption === "multiple" ? baseSinglePrice + 20 : baseSinglePrice;
  const singlePriceBefore = singleProduct.frontmatter.price_before || null;
  const singleSavePercent = singlePriceBefore
    ? parseInt(100 - (singlePrice / singlePriceBefore) * 100)
    : null;

  return (
    <section className="bg-[#F8F8F8] py-12" id="product-pricing">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-2">Choose Perfect Plan For You</h2>
          <p className="text-muted">
            Find the right package that fits your development goals and budget
          </p>
        </div>
        <div className="row gx-3 gy-4 row-cols-1 md:row-cols-2 xl:row-cols-4 mb-12 justify-center">
          {/* Single Product Card */}
          <PricingCard
            title={singleProduct.frontmatter.title}
            price={singlePrice}
            priceBefore={singlePriceBefore}
            savePercent={singleSavePercent}
            subtitle={
              singleOption === "multiple"
                ? "Lifetime Access, Up to 5 Projects"
                : "Lifetime Access, 1 Project License"
            }
            desc="Perfect for single project"
            features={SINGLE_FEATURES}
            onPurchase={() => handlePurchase("single")}
            loading={loader.single}
            highlight={false}
            isSingle={true}
            selectValue={singleOption}
            onSelectChange={(option) => setSingleOption(option.value)}
          />
          {/* Bundle Cards */}
          {type !== "framer" &&
            packages.map((pkg) => {
              const pkgInfo = bundle?.packages?.find((p) => p.package === pkg);

              return (
                <PricingCard
                  key={pkg}
                  title={pkgInfo?.title}
                  price={pkgInfo ? parseFloat(pkgInfo.price).toFixed(0) : "--"}
                  priceBefore={
                    pkgInfo && pkgInfo.price_before
                      ? parseFloat(pkgInfo.price_before).toFixed(0)
                      : null
                  }
                  savePercent={
                    pkgInfo && pkgInfo.price_before
                      ? parseInt(
                          100 - (pkgInfo.price / pkgInfo.price_before) * 100,
                        )
                      : null
                  }
                  subtitle={pkgInfo?.subtitle}
                  desc={descMap[pkg]}
                  features={[
                    () =>
                      `**${singleProduct.frontmatter.title}** + <a href="/bundles/${type}-bundle" target="_blank" class="text-primary capitalize">${allProducts.length} Premium Themes</a>`,
                    ...FEATURES[pkg].slice(1),
                  ]}
                  onPurchase={() => handlePurchase(pkg)}
                  loading={loader[pkg]}
                  highlight={pkg === "plus"}
                  isSingle={false}
                />
              );
            })}
        </div>
        <PaymentOptions />
      </div>
    </section>
  );
}
