import Spinner from "@/components/Spinner";
import bundles from "@/config/bundle.json";
import { useCartContext } from "@/context/useCartContext";
import Axios from "@/lib/axios";
import { updateCartItem } from "lib/utils/cartManager";
import { addMonthsToCurrentDate } from "lib/utils/dateFormat";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import useCookie from "react-use-cookie";
import CartProduct from "./CartProduct";
import CrossSell from "./CrossSell";
import DiscountCode from "./DiscountCode";
import FreeAdOns from "./FreeAdOns";
import OrderSummary from "./OrderSummary";
import PaidAddOns from "./PaidAddOns";
import UpSellSection from "./UpSell";

const VENDOR_ID = Number(process.env.NEXT_PUBLIC_VENDOR_ID);
const VENDOR_AUTH_CODE = process.env.NEXT_PUBLIC_VENDOR_AUTH_CODE;
const ENV = process.env.NODE_ENV;

const CheckoutActions = ({ authComplete, setAuthComplete }) => {
  const couponInputRef = useRef(null);
  const customization = bundles.customization_service;
  const customizationPkg = customization.packages[0];
  const premiumSupport = bundles.premium_support;
  const premiumSupportPkg = premiumSupport.packages[0];
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();
  const { cartDispatch, cartState } = useCartContext();
  const { discountCode, discountForm, discountAmount, service, support } =
    cartState;
  const carts = cartState.carts;
  const [isExpanded, setIsExpanded] = useState(false);

  // Coupon and service cookies
  const [appliedCoupon, setAppliedCoupon] = useCookie("appliedCoupon", "");
  const [appliedDiscountAmount, setAppliedDiscountAmount] = useCookie(
    "appliedDiscountAmount",
    "",
  );
  const [crossSaleService, setCrossSaleService] = useCookie(
    "crossSaleService",
    "",
  );
  const [supportAddOn, setSupportAddOn] = useCookie("supportAddOn", "");

  // restore cookies to cart state
  useEffect(() => {
    if (appliedCoupon) {
      cartDispatch({
        type: "ADD_COUPON",
        payload: appliedCoupon,
      });
      cartDispatch({
        type: "CHANGE_DISCOUNT_CODE",
        payload: appliedCoupon,
      });
      cartDispatch({
        type: "CHANGE_DISCOUNT_FORM",
        payload: true,
      });
    }
    if (appliedDiscountAmount) {
      cartDispatch({
        type: "CHANGE_DISCOUNT_AMOUNT",
        payload: appliedDiscountAmount,
      });
    }
    if (crossSaleService) {
      cartDispatch({
        type: "CHANGE_SERVICE",
        payload: crossSaleService === "true",
      });
    }
    if (supportAddOn) {
      cartDispatch({
        type: "CHANGE_SUPPORT",
        payload: supportAddOn === "true",
      });
    }
  }, [
    session,
    cartDispatch,
    appliedCoupon,
    appliedDiscountAmount,
    supportAddOn,
    crossSaleService,
  ]);

  // update cart
  useEffect(() => {
    updateCartItem(carts, session, cartDispatch);

    // Remove applied coupon and discount if cart changes
    cartDispatch({ type: "CHANGE_DISCOUNT_CODE", payload: "" });
    cartDispatch({ type: "CHANGE_DISCOUNT_AMOUNT", payload: "" });
    cartDispatch({ type: "ADD_COUPON", payload: "" });
    cartDispatch({ type: "CHANGE_DISCOUNT_FORM", payload: false });

    // remove form cookies
    setAppliedCoupon("", { minutes: 0, SameSite: "Strict", Secure: true });
    setAppliedDiscountAmount("", {
      minutes: 0,
      SameSite: "Strict",
      Secure: true,
    });
  }, [carts?.length, status]);

  // fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await Axios.get("/coupon/public", {
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      setCoupons(coupons.data.result);
    };
    fetchCoupons();
  }, []);

  // handle total price
  const sumOfCartPrice = useMemo(() => {
    return carts.reduce((prev, item) => prev + Number(item?.price || 0), 0);
  }, [carts]);

  // total price after discount
  const priceAfterDiscount = useMemo(() => {
    if (!discountAmount) return sumOfCartPrice;
    const discountValue = discountAmount.endsWith("%")
      ? (sumOfCartPrice * Number(discountAmount.slice(0, -1))) / 100
      : Number(discountAmount);
    return sumOfCartPrice - discountValue;
  }, [sumOfCartPrice, discountAmount]);

  // total price after cross sale
  const sumOfPrice = useMemo(() => {
    return (
      priceAfterDiscount +
      Number(service ? customizationPkg.price : 0) +
      Number(support ? premiumSupportPkg.price : 0)
    );
  }, [priceAfterDiscount, service, support, customizationPkg.price]);

  // payment processing fee
  const processingFee = useMemo(() => {
    return sumOfPrice > 0 ? sumOfPrice * 0.05 + 0.5 : 0;
  }, [sumOfPrice]);

  // payable amount
  const payableAmount = useMemo(() => {
    return Number((sumOfPrice + processingFee).toFixed(2));
  }, [sumOfPrice, processingFee]);

  // apply discount
  const handleApplyDiscount = (discountCode, discount) => {
    cartDispatch({
      type: "CHANGE_DISCOUNT_AMOUNT",
      payload: discount,
    });
    cartDispatch({
      type: "ADD_COUPON",
      payload: discountCode,
    });
    setError("");
    // Save coupon and discount to cookies (1 hour)
    setAppliedCoupon(discountCode, {
      minutes: 60,
      SameSite: "Strict",
      Secure: true,
    });
    setAppliedDiscountAmount(discount, {
      minutes: 60,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // product info
  const product_info = useMemo(() => {
    let productInfo = carts.map((item) => {
      return {
        slug: item.slug,
        price: item.price,
        package: item.package,
        expires:
          item.package === "starter"
            ? addMonthsToCurrentDate(12).toISOString()
            : null,
      };
    });

    if (service) {
      productInfo.push({
        slug: customization.slug,
        package: customizationPkg.package,
        price: customizationPkg.price,
        expires: addMonthsToCurrentDate(12).toISOString(),
      });
    }

    if (support) {
      productInfo.push({
        slug: premiumSupport.slug,
        package: premiumSupportPkg.package,
        price: premiumSupportPkg.price,
        expires: addMonthsToCurrentDate(12).toISOString(),
      });
    }

    return productInfo;
  }, [carts, service, support, customization.slug, customizationPkg]);

  // handle purchase
  const handlePurchase = async () => {
    setLoader(true);
    const paddleResponse = await Axios.post("paddle/generate-pay-link", {
      vendor_id: VENDOR_ID,
      vendor_auth_code: VENDOR_AUTH_CODE,
      title: `${carts.map((data) => data.title + " (" + data.package + ")").join(", ")}${
        support ? " with Extended Support" : ""
      }`,
      webhook_url: `https://themefisher.com/api/paddlefulfillment`,
      prices: [`USD:${payableAmount}`],
      image_url: "https://themefisher.com/images/logo/profile.png",
      customer_email: session?.user.email,
      discountable: 0,
      quantity_variable: 0,
      marketing_consent: 0,
      is_recoverable: 0,
      return_url: `${
        ENV === "development"
          ? "http://localhost:3000"
          : "https://themefisher.com"
      }/onboarding?purchase=true&upgraded=${carts[0]?.upgraded ? "true" : "false"}`,
    });

    Paddle.Checkout.open({
      override: paddleResponse.data.url,
      customData: {
        internal_coupon: cartState.coupon,
        internal_products: product_info,
      },
      closeCallback: async () => {
        setLoader(false);
        setAuthComplete(false);
      },
    });
  };

  // trigger purchase when authComplete is true
  useEffect(() => {
    authComplete && handlePurchase();
  }, [authComplete]);

  return (
    <>
      <CartProduct
        session={session}
        handleApplyDiscount={handleApplyDiscount}
      />

      {/* paid add-ons */}
      <PaidAddOns
        support={support}
        cartDispatch={cartDispatch}
        setSupportAddOn={setSupportAddOn}
      />

      {/* free add-ons */}
      <FreeAdOns />

      {/* up sell */}
      <UpSellSection
        carts={carts}
        bundles={bundles}
        session={session}
        cartDispatch={cartDispatch}
      />

      {/* cross sell */}
      <CrossSell
        customizationPkg={customizationPkg}
        service={service}
        cartDispatch={cartDispatch}
        setCrossSaleService={setCrossSaleService}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <div className="bg-white mt-6 rounded-lg">
        {/* order summary */}
        <OrderSummary
          carts={carts}
          discountAmount={discountAmount}
          sumOfCartPrice={sumOfCartPrice}
          priceAfterDiscount={priceAfterDiscount}
          service={service}
          customizationPkg={customizationPkg}
          support={support}
          premiumSupportPkg={premiumSupportPkg}
          processingFee={processingFee}
        />

        {/* discount coupon */}
        <DiscountCode
          discountForm={discountForm}
          discountCode={discountCode}
          cartDispatch={cartDispatch}
          couponInputRef={couponInputRef}
          handleApplyDiscount={handleApplyDiscount}
          error={error}
          setError={setError}
          coupons={coupons}
          carts={carts}
          setAppliedCoupon={setAppliedCoupon}
          setAppliedDiscountAmount={setAppliedDiscountAmount}
          discountAmount={discountAmount}
        />

        {/* total payable */}
        <div className="px-6 pb-5">
          <div className="mb-2 flex justify-between rounded-md bg-[#F6F6FC] p-6 ">
            <p>Amount Payable</p>
            <p className="text-xl font-bold text-dark">${payableAmount}</p>
          </div>
        </div>
      </div>

      {session && (
        <button
          className={`btn btn-primary bg-[#27C762] hover:bg-[#27C762] mt-8 block w-full`}
          onClick={handlePurchase}
        >
          {loader ? (
            <>
              Please wait
              <Spinner />
            </>
          ) : (
            <>
              Pay Now{" "}
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path
                  d="M1.5 5H11.5M11.5 5L7.33333 1M11.5 5L7.33333 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default CheckoutActions;
