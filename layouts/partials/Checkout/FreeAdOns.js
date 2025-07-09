import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

const FreeAdOns = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden  mt-6">
      <div className="py-3 px-6 flex justify-between bg-theme-light items-center">
        <h3 className="text-h6">Included for FREE</h3>
        {/* <span className="bg-[#27C762] text-white rounded-full px-4 py-1 text-sm font-bold">
          $100 value
        </span> */}
      </div>
      <div className="px-6 py-3">
        <div className="flex items-start py-3 flex-wrap md:flex-nowrap">
          <div className="flex-shrink-0 mr-3 hidden md:block">
            <Image
              width="32"
              height="32"
              src="/images/icons/settings.svg"
              alt="settings icon"
              className="size-8 rounded-sm"
            />
          </div>
          <div className="mr-4">
            <p className="mb-1">Installation and Deployment</p>
            <p className="text-muted text-sm">
              Theme installation, git setup & deploy to chosen platform.{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href={"/support-policy"}
              >
                Learn more
              </Link>
            </p>
          </div>
          <div className="md:text-right w-full md:w-auto md:ml-auto mt-4 md:mt-0">
            <span className="whitespace-nowrap font-medium">
              <span className="rounded-full align-middle bg-[#27C762] size-5 inline-flex items-center justify-center mr-1">
                <FaCheck className="size-3 text-white" />
              </span>
              Included for FREE
            </span>
            <s className="text-[#FA0A00] block">$100.00</s>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAdOns;
