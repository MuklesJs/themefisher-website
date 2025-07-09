import { deleteCartItem, updateCartItem } from "lib/utils/cartManager";
import getProductLink from "lib/utils/productLinkGenerator";
import { titleify } from "lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const UpSell = ({ carts, bundles, session, cartDispatch }) => {
  const getUpSellProduct = useMemo(() => {
    if (!carts.length) return null;
    const cartItem = carts[0];
    const slug = cartItem?.slug || "";
    const packageName = cartItem?.package || "";

    const bundleKey = Object.keys(bundles).find((key) => {
      return (
        bundles[key].slug === slug ||
        bundles[key].slug === slug.replace("-bundle", "")
      );
    });

    const bundle = bundles[bundleKey];

    if (packageName === "elite" && slug !== "themefisher-bundle") {
      const allAccess = bundles["themefisher_bundle"];
      if (!allAccess) return null;
      const plusPkg = allAccess.packages.find((p) => p.package === "plus");
      return {
        ...allAccess,
        ...plusPkg,
        package: plusPkg.package,
        support: plusPkg.support,
        price: plusPkg.price,
        price_before: plusPkg.price_before,
        displayTitle: plusPkg.title,
        title: allAccess.title,
        subtitle: plusPkg.subtitle,
        slug: allAccess.slug,
      };
    }

    if (packageName === "starter") {
      const plusPkg = bundle?.packages.find((p) => p.package === "plus");
      if (!plusPkg) return null;
      return {
        ...bundle,
        ...plusPkg,
        package: plusPkg.package,
        support: plusPkg.support,
        price: plusPkg.price,
        price_before: plusPkg.price_before,
        displayTitle: plusPkg.title,
        title: bundle.title,
        subtitle: plusPkg.subtitle,
        slug: bundle.slug,
      };
    }
    if (packageName === "plus") {
      const elitePkg = bundle.packages.find((p) => p.package === "elite");
      if (!elitePkg) return null;
      return {
        ...bundle,
        ...elitePkg,
        package: elitePkg.package,
        support: elitePkg.support,
        price: elitePkg.price,
        price_before: elitePkg.price_before,
        displayTitle: elitePkg.title,
        title: bundle.title,
        subtitle: elitePkg.subtitle,
        slug: bundle.slug,
      };
    }

    if (slug === "themefisher-bundle") return null;

    return null;
  }, [carts, bundles]);

  const handleUpSell = async () => {
    const productInfo = [
      {
        title: getUpSellProduct?.title,
        image: getUpSellProduct?.image,
        price: getUpSellProduct?.price,
        slug: getUpSellProduct?.slug,
        package: getUpSellProduct?.package,
        support: getUpSellProduct?.support,
        upgraded: true,
      },
    ];
    await updateCartItem(productInfo, session, cartDispatch);
    await deleteCartItem(
      carts[0]?.slug,
      carts[0]?.package,
      session,
      cartDispatch,
    );
  };

  if (!getUpSellProduct) return null;

  return (
    <div className="bg-[#f5fff9] rounded-lg overflow-hidden mt-6">
      <div className="py-2 px-6 flex justify-between bg-[#b7facf]">
        <h3 className="text-h6">
          <span className="font-light">Add only</span>{" "}
          <span className="text-dark leading-tight text-2xl">
            ${parseFloat(getUpSellProduct?.price - carts[0]?.price).toFixed(0)}
          </span>{" "}
          <span className="font-light">and Upgrade to</span>{" "}
          {getUpSellProduct?.displayTitle}
        </h3>
      </div>
      <div className="rounded-lg flex items-start py-3 px-6 relative">
        <Image
          src={getUpSellProduct.image}
          alt={getUpSellProduct.title}
          width="106"
          height="80"
          className="rounded-sm mr-3 border hidden sm:block border-border"
        />
        <div>
          <Link
            href={getProductLink(getUpSellProduct?.slug)}
            className="font-medium block mb-1 hover:text-primary line-clamp-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getUpSellProduct?.displayTitle}
          </Link>
          <p className="text-sm mb-1 text-muted">
            {getUpSellProduct?.subtitle}
          </p>
          <p className="text-sm text-muted">
            {titleify(getUpSellProduct?.support)} Premium Support
          </p>
        </div>
        <div className="ml-auto text-right flex flex-col">
          <span className="text-[13px] text-[#FA0A00] line-through font-medium">
            was ${parseFloat(getUpSellProduct?.price_before).toFixed(2)}
          </span>
          <strong className="text-dark">
            ${parseFloat(getUpSellProduct?.price).toFixed(2)}
          </strong>
          <button
            onClick={handleUpSell}
            className={`btn bg-transparent btn-xs pl-0.5 mt-2 pr-3 py-0.5 rounded-full text-[#27C762] btn-outline-primary border-[#27C762] hover:bg-[#27C762] hover:text-white whitespace-nowrap`}
          >
            <IoArrowUpCircleOutline className="size-5 mr-1" />
            upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpSell;
