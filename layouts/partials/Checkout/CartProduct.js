import bundleData from "config/bundle.json";
import { useCartContext } from "context/useCartContext";
import { deleteCartItem } from "lib/utils/cartManager";
import getProductLink from "lib/utils/productLinkGenerator";
import { titleify } from "lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GrFormClose, GrFormRefresh } from "react-icons/gr";

const getBundleDiscount = (slug, pkgName) => {
  const bundle = Object.values(bundleData).find((b) => b.slug === slug);
  if (!bundle) return null;
  const pkg = bundle.packages.find((p) => p.package === pkgName);
  if (!pkg) return null;
  const priceBefore = parseFloat(pkg.price_before);
  const price = parseFloat(pkg.price);
  if (isNaN(priceBefore) || isNaN(price) || priceBefore <= price) return null;
  const discount = priceBefore - price;
  const percent = Math.round((discount / priceBefore) * 100);
  return { discount, percent, priceBefore, price };
};

const BundlePrice = ({ price, discountInfo }) => (
  <div className="flex flex-col items-end">
    <span className="text-[13px] text-[#FA0A00] line-through font-medium">
      was ${discountInfo.priceBefore.toFixed(2)}
    </span>
    <strong className="text-dark block leading-tight">
      ${parseFloat(price).toFixed(2)}
    </strong>
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-muted hidden xl:block">Special offer</span>
      <span className="bg-yellow-200 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
        {discountInfo.percent}% OFF
      </span>
    </div>
  </div>
);

const CartProduct = ({ session, handleApplyDiscount }) => {
  const { cartDispatch, cartState } = useCartContext();
  const { carts } = cartState;
  const [deleteLoader, setDeleteLoader] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteSlug, setPendingDeleteSlug] = useState(null);

  const handleDelete = async (slug, pkg) => {
    if (carts.length === 1) {
      setPendingDeleteSlug(`${slug}+${pkg}`);
      setShowDeleteModal(true);
      return;
    }
    setDeleteLoader(`${slug}+${pkg}`);
    const deleted = await deleteCartItem(slug, pkg, session, cartDispatch);
    if (deleted) setDeleteLoader("");
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (!pendingDeleteSlug) return;
    setDeleteLoader(pendingDeleteSlug);
    const [slug, pkg] = pendingDeleteSlug.split("+");
    const deleted = await deleteCartItem(slug, pkg, session, cartDispatch);
    if (deleted) {
      setDeleteLoader("");
      setPendingDeleteSlug(null);
    }
  };

  const declineDelete = () => {
    handleApplyDiscount("LASTCALL", "20%");
    setShowDeleteModal(false);
    setPendingDeleteSlug(null);
  };

  const renderPrice = (product) => {
    if (product.slug.includes("bundle")) {
      const discountInfo = getBundleDiscount(product.slug, product.package);
      if (discountInfo) {
        return (
          <BundlePrice price={product.price} discountInfo={discountInfo} />
        );
      }
    }
    return (
      <strong className="text-dark block leading-tight">
        ${parseFloat(product?.price).toFixed(2)}
      </strong>
    );
  };

  return (
    <>
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-sm w-full text-center">
            <strong className="mb-3 block">
              Wait! Here's 20% Off Just for You
            </strong>
            <p className="mb-4">
              Don't miss out! Keep this item and get an extra 20% off instantly
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-xs btn-outline-primary"
                onClick={confirmDelete}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-xs btn-primary"
                onClick={declineDelete}
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="py-3 px-6 bg-theme-light">
          <h3 className="text-h6">Your Cart</h3>
        </div>
        <div className="px-6 py-3">
          {carts?.length > 0 &&
            carts.map((product, i) => (
              <div
                key={i}
                className={`flex items-center py-3 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <Image
                  width="106"
                  height="80"
                  src={product?.image}
                  alt={`${product?.title} thumbnail`}
                  className="rounded-sm mr-3 border hidden sm:block border-border"
                />
                <div>
                  <Link
                    href={getProductLink(product?.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark font-medium  hover:text-primary line-clamp-1"
                  >
                    {product?.title}
                  </Link>
                  <ul className="text-muted mt-1 space-y-1">
                    <li className="text-sm text-muted capitalize">
                      Package:{" "}
                      <span className="text-dark">{product?.package}</span>
                    </li>
                    <li className="text-sm text-muted capitalize">
                      Support:{" "}
                      <span className="text-dark">
                        {titleify(product?.support)}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="ml-auto">{renderPrice(product)}</div>
                <button
                  className="ml-3 size-6 leading-none bg-theme-light rounded-full"
                  value={product?.slug}
                  onClick={() => handleDelete(product?.slug, product?.package)}
                >
                  {deleteLoader === `${product?.slug}+${product?.package}` ? (
                    <GrFormRefresh className="text-xl text-red-600 animate-spin" />
                  ) : (
                    <GrFormClose className="text-xl text-dark" />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CartProduct;
