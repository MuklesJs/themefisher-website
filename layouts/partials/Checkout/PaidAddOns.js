import bundles from "@/config/bundle.json";
import Image from "next/image";
import { FaCheck, FaPlus } from "react-icons/fa6";

const premiumSupport = bundles.premium_support.packages[0];

const PaidAddOns = ({ support, cartDispatch, setSupportAddOn }) => {
  const handleSupportToggle = () => {
    const newSupport = !support;
    cartDispatch({
      type: "CHANGE_SUPPORT",
      payload: newSupport,
    });
    setSupportAddOn &&
      setSupportAddOn(newSupport ? "true" : "false", {
        minutes: 60,
        SameSite: "Strict",
        Secure: true,
      });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden  mt-6">
      <div className="py-3 px-6 flex justify-between bg-theme-light">
        <h3 className="text-h6">Recommended Add-Ons</h3>
      </div>
      <div className="px-6 py-3">
        <div className="flex items-start py-3 flex-wrap md:flex-nowrap">
          <div className="flex-shrink-0 mr-3 hidden md:block">
            <Image
              width="32"
              height="32"
              src="/images/icons/calendar.svg"
              alt="calendar icon"
              className="size-8 rounded-sm"
            />
          </div>
          <div className="mr-4">
            <p className="mb-1">{premiumSupport.title}</p>
            <p className="text-muted text-sm">{premiumSupport.subtitle}</p>
          </div>
          <div className="md:text-right w-full md:w-auto md:ml-auto mt-4 md:mt-0">
            <button
              className="whitespace-nowrap font-medium"
              onClick={handleSupportToggle}
              type="button"
            >
              {support ? (
                <>
                  <span className="rounded-full align-middle bg-[#27C762] size-5 inline-flex items-center justify-center mr-1">
                    <FaCheck className="size-3 text-white" />
                  </span>
                  Included for ${premiumSupport.price}
                </>
              ) : (
                <span className="btn btn-xs py-1 pl-2 rounded-full text-[#27C762] btn-outline-primary border-[#27C762] hover:bg-[#27C762] hover:text-white whitespace-nowrap">
                  <FaPlus className="size-4 -mt-0.5 text-inherit mr-1" />
                  Include for ${premiumSupport.price}
                </span>
              )}
            </button>
            {support && (
              <span
                className="text-[#FA0A00] block cursor-pointer"
                onClick={handleSupportToggle}
              >
                remove
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidAddOns;
