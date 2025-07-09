import { FaCheck } from "react-icons/fa";

const CheckoutSteps = () => {
  return (
    <div className="row mb-8 mx-0 gx-0">
      <div className="text-left col-4 relative">
        <span className="h-1 inline-block w-full absolute left-0 top-[15px] from-50% to-50% to bg-gradient-to-r from-[#27C762] to-[#27C762]" />
        <div className="rounded-full relative z-10 bg-[#27C762] size-8 text-center flex items-center justify-center">
          <FaCheck className="size-4 text-white" />
        </div>
        <span className="text-sm hidden md:block mt-1">Choose Products</span>
      </div>
      <div className="text-center col-4 relative">
        <span className="h-1 inline-block w-full absolute left-0 top-[15px] from-50% to-50% to bg-gradient-to-r from-[#27C762] to-border" />
        <div className="rounded-full relative z-10 mx-auto bg-[#27C762] size-8 text-center flex items-center justify-center ">
          <span className="bg-white size-[28px] text-[#27C762] rounded-full flex items-center justify-center">
            2
          </span>
        </div>
        <span className="text-sm hidden md:block mt-1">Account Info</span>
      </div>
      <div className="text-right col-4 relative">
        <span className="h-1 inline-block w-full absolute left-0 top-[15px] from-50% to-50% to bg-gradient-to-r from-border to-border" />
        <div className="rounded-full relative z-10 ml-auto bg-white size-8 text-center flex items-center justify-center">
          <span className="text-muted">3</span>{" "}
        </div>
        <span className="text-sm hidden md:block mt-1">Instant Access</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
