import { FaCheck, FaPlus } from "react-icons/fa6";

const CrossSell = ({
  customizationPkg,
  service,
  cartDispatch,
  setCrossSaleService,
  isExpanded,
  setIsExpanded,
}) => {
  const handleCrossSell = () => {
    const newService = !service;
    cartDispatch({
      type: "CHANGE_SERVICE",
      payload: newService,
    });
    setCrossSaleService(newService ? "true" : "false", {
      minutes: 60,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // List items for expanded and collapsed states
  const featureItems = [
    {
      label: "Modifying existing pages & sections",
      type: "main",
      show: true,
    },
    {
      label: "Customizing colors and brands",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Removing unneeded pages & sections",
      type: "main",
      show: isExpanded,
    },
    {
      label: "95+ Google PageSpeed scores",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Dedicated Developer",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Dedicated project manager",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Unlimited visual assets from Freepik",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Delivery in 2-3 business days",
      type: "main",
      show: isExpanded,
    },
    {
      label: "Claim within 30 days",
      type: "note",
      show: isExpanded || !isExpanded,
    },
    {
      label: "Valid for one theme only",
      type: "note",
      show: isExpanded,
    },
    {
      label: "Assets & instructions required",
      type: "note",
      show: isExpanded,
    },
    {
      label: "Two minor revisions included",
      type: "note",
      show: isExpanded,
    },
    {
      label: "Advanced modifications require extra charges",
      type: "note",
      show: isExpanded,
    },
  ];

  const getDotColor = (type) => (type === "main" ? "#b3f3b8" : "#eeee65");

  return (
    <div className="bg-white hidden rounded-lg overflow-hidden  mt-6">
      <div className="py-3 px-6 flex justify-between bg-theme-light">
        <h3 className="text-h6">{customizationPkg.subtitle}</h3>
      </div>
      <div className="py-3 px-4 flex items-start rounded-lg">
        <div>
          <strong className="cursor-pointer">{customizationPkg.title}</strong>
          <p className="text-sm text-muted mb-3">
            Regularly <strong>${customizationPkg.price_before}</strong>, now{" "}
            <strong>${customizationPkg.price}</strong> with Theme Purchase
          </p>
          <div className="mr-3">
            <ul className="text-muted mt-1 space-y-1">
              {featureItems
                .filter((item) => item.show)
                .map((item, idx) => (
                  <li
                    key={idx}
                    className={`text-xs pl-3 relative after:absolute after:-left-0 after:top-1 after:size-1.5 after:rounded-full after:content-['']`}
                    style={{
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.25rem",
                        width: "0.375rem",
                        height: "0.375rem",
                        backgroundColor: getDotColor(item.type),
                        borderRadius: "9999px",
                        content: "''",
                        display: "inline-block",
                      }}
                    ></span>
                    <span>{item.label}</span>
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary underline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>

        <div className="md:text-right w-full md:w-auto md:ml-auto">
          <button
            onClick={handleCrossSell}
            className={`whitespace-nowrap font-medium ${
              service
                ? ""
                : "btn btn-xs py-1 pl-2 rounded-full text-[#27C762] btn-outline-primary border-[#27C762] hover:bg-[#27C762] hover:text-white whitespace-nowrap"
            }`}
            type="button"
          >
            {service ? (
              <>
                <span className="rounded-full align-middle bg-[#27C762] size-5 inline-flex items-center justify-center mr-1">
                  <FaCheck className="size-3 text-white" />
                </span>
                Included for ${customizationPkg.price}
              </>
            ) : (
              <>
                <FaPlus className="size-4 -mt-0.5 text-inherit mr-1" />
                Include for ${customizationPkg.price}
              </>
            )}
          </button>
          {service && (
            <span
              className="text-[#FA0A00] block cursor-pointer"
              onClick={handleCrossSell}
            >
              remove
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrossSell;
