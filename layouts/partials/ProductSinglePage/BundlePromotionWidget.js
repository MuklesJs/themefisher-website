import bundles from "@/config/bundle.json";
import products from "@/json/products.json";
import { markdownify } from "@/lib/utils/textConverter";
import usePurchasedProducts from "hooks/usePurchasedProducts";
import Link from "next/link";

const BundlePromotionWidget = ({ type }) => {
  const bundle = bundles[`${type}_bundle`];
  const { purchasedBundles } = usePurchasedProducts();
  const isTheme = bundle.slug.includes("astro") || bundle.slug.includes("hugo");

  const allProducts =
    type === "themefisher"
      ? products.filter((product) => product.frontmatter.price !== 0)
      : products.filter(
          (product) =>
            product.frontmatter.type === type &&
            product.frontmatter.price !== 0,
        );

  // Find the starter package
  const starterPackage = bundle.packages.find(
    (pkg) => pkg.package === "starter",
  );

  return (
    <>
      {purchasedBundles?.find((d) => d === bundle.slug) ? (
        ""
      ) : (
        <div className="rounded-md text-center relative">
          <div className="block text-white relative mt-6 rounded bg-[#2D44F5] p-6 pt-2 lg:mt-0 xl:mt-6">
            <span className="bg-white shadow text-dark inline-block -translate-y-5 text-xs py-1 px-7 rounded-full font-semibold">
              OR, SAVE BIG NOW
            </span>
            <h4 className="text-h5 text-white mb-4 font-primary capitalize">
              Unlock {allProducts.length}+ {type}{" "}
              {isTheme ? "Themes" : "Templates"}!
            </h4>
            {markdownify(
              `Get all current ${type} ${isTheme ? "themes" : "templates"} + All upcoming ${isTheme ? "themes" : "templates"} for only **$${starterPackage.price}**!`,
              "p",
              "text-sm font-light",
            )}
            <Link
              href={`/bundles/${bundle.slug}`}
              className={`bundle-promotion-widget-${type} mt-5 block w-full rounded bg-[#FEF83B] py-2 font-semibold text-dark hover:!text-dark`}
            >
              Get Unlimited Access
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BundlePromotionWidget;
