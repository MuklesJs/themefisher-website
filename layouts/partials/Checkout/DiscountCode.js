const DiscountCode = ({
  discountForm,
  discountCode,
  cartDispatch,
  couponInputRef,
  handleApplyDiscount,
  error,
  setError,
  coupons,
  carts,
  setAppliedCoupon,
  setAppliedDiscountAmount,
  discountAmount,
}) => {
  const discountHandleClick = () => {
    cartDispatch({
      type: "CHANGE_DISCOUNT_FORM",
      payload: true,
    });
    setTimeout(() => {
      couponInputRef?.current?.focus();
    }, 100);
  };

  // Moved here from CheckoutCart
  const isValidDiscountCode = (discountCode) => {
    const coupon = coupons.find((coupon) => coupon.code === discountCode);

    if (!coupon) return false;
    if (coupon.status !== "active") return false;
    const currentDate = new Date();
    const expirationDate = new Date(coupon.expires);
    if (currentDate > expirationDate) return false;

    // included_products with packages as array of string
    if (coupon.included_products && coupon.included_products.length > 0) {
      const includesAllCartItems = carts.every((cart) =>
        coupon.included_products.some(
          (includedProduct) =>
            cart.slug === includedProduct.slug &&
            Array.isArray(includedProduct.packages) &&
            includedProduct.packages.includes(cart.package),
        ),
      );
      if (!includesAllCartItems) return false;
    }

    // included_types
    if (coupon.included_types && coupon.included_types.length > 0) {
      const cartSlugs = carts.map((cart) => cart.slug);
      const includesAllTypes = coupon.included_types.every(
        (type) =>
          type === null || cartSlugs.some((slug) => slug.includes(type)),
      );
      if (!includesAllTypes) return false;
    }

    return true;
  };

  const findDiscountByCode = (value) => {
    for (let i = 0; i < coupons.length; i++) {
      if (coupons[i].code === value) {
        return coupons[i].discount;
      }
    }
    return "";
  };

  // Handles the discount form submission
  const handleDiscount = (e) => {
    e.preventDefault();
    if (isValidDiscountCode(discountCode)) {
      const discount = findDiscountByCode(discountCode);
      handleApplyDiscount(discountCode, discount);
    } else {
      setError("This discount code is invalid");
      setAppliedCoupon("", { minutes: 0, SameSite: "Strict", Secure: true });
      setAppliedDiscountAmount("", {
        minutes: 0,
        SameSite: "Strict",
        Secure: true,
      });
    }
  };

  // Remove applied discount
  const handleRemoveDiscount = () => {
    cartDispatch({ type: "CHANGE_DISCOUNT_CODE", payload: "" });
    cartDispatch({ type: "CHANGE_DISCOUNT_AMOUNT", payload: "" });
    cartDispatch({ type: "ADD_COUPON", payload: "" });
    setAppliedCoupon("", { minutes: 0, SameSite: "Strict", Secure: true });
    setAppliedDiscountAmount("", {
      minutes: 0,
      SameSite: "Strict",
      Secure: true,
    });
    setError("");
  };

  return (
    <div className="mb-4 px-6">
      {!discountForm ? (
        <p className="text-sm text-muted">
          Have a discount code ?{" "}
          <span
            onClick={discountHandleClick}
            className="cursor-pointer italic text-dark underline"
          >
            Click to enter it
          </span>
        </p>
      ) : discountAmount && discountCode && !error ? (
        <div className="mt-2 font-semibold flex items-center gap-3">
          <span>
            Coupon <span className="text-[#27C762]">{discountCode}</span>{" "}
            applied!
          </span>
          <button
            type="button"
            className="text-xs text-red-600 underline ml-2"
            onClick={handleRemoveDiscount}
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleDiscount}>
          <div className="flex">
            <input
              ref={couponInputRef}
              type="text"
              className="form-input focus:border-dark/50 h-10 flex-1 mr-4"
              name="coupon"
              placeholder="Discount Code"
              value={discountCode}
              onChange={(e) => {
                cartDispatch({
                  type: "CHANGE_DISCOUNT_CODE",
                  payload: e.target.value,
                });
                setError("");
                cartDispatch({
                  type: "CHANGE_DISCOUNT_AMOUNT",
                  payload: "",
                });
              }}
              required
            />
            <button className="btn btn-sm h-10 py-1.5 shrink-0 btn-dark">
              Apply
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default DiscountCode;
