import Link from "next/link";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import reactUseCookie from "react-use-cookie";

const ServicePromotion = () => {
  const [closeDashCta, setCloseDashCta] = reactUseCookie("closeDashCta", false);
  const [mounted, setMounted] = useState(false);

  // set mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // cookie handler
  const cookieHandler = () => {
    setCloseDashCta(true, {
      days: 7,
      SameSite: "Strict",
      Secure: true,
    });
  };
  return (
    <>
      {/* customization service promotion */}
      {mounted && !closeDashCta && (
        <div
          className={`bg-secondary/20 relative px-4 py-6 border row mx-0 mb-8 border-secondary rounded text-left ${closeDashCta ? "hidden" : undefined}`}
        >
          <button onClick={() => cookieHandler()}>
            <BsX className="text-3xl absolute top-2 right-2" />
          </button>
          <div className="md:col-7 mb-6 md:mb-0">
            <h3 className="text-xl mb-3">What's Included</h3>
            <ul className="pl-0 mb-4 xl:columns-2 *:mb-3">
              <li>
                <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                Adding new pages/sections
              </li>
              <li>
                <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                Removing unneeded pages/sections
              </li>
              <li>
                <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                Customizing Colors and Brands
              </li>
              <li>
                <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                Third Party service integrations
              </li>
              <li>
                <IoMdCheckmarkCircle className="text-green-500 mr-1 -mt-0.5" />
                Adding Headless CMS
              </li>
            </ul>
          </div>
          <div className="md:col-5">
            <h3 className="text-xl mb-3">Need Help to Customize The Theme?</h3>
            <p className="mb-6 text-sm">
              We can help customize your theme to meet your specific needs
            </p>
            <Link
              href="/dashboard/customization"
              className="btn btn-sm btn-primary"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicePromotion;
