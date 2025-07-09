import Link from "next/link";
import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoNewspaperOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const CheckoutFacts = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h3 className="text-h6 mb-4">Purchase With Confidence</h3>
      <div className="row">
        <div className="col-6 mb-4">
          <div className="flex">
            <IoCalendarOutline className="size-6 text-dark shrink-0 mr-2" />
            <div>
              <p className="mb-0">14-Day Refund</p>
              <p className="text-sm text-muted leading-1">
                Money back guarantee,{" "}
                <Link
                  href="/refund-policy"
                  target="_blank"
                  className="underline"
                >
                  Refund Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="flex">
            <IoNewspaperOutline className="size-6 text-dark shrink-0 mr-2" />
            <div>
              <p className="mb-0">Detailed Documentation</p>
              <p className="text-sm text-muted leading-1">
                For each theme,{" "}
                <Link
                  href="https://docs.themefisher.com/"
                  target="_blank"
                  className="underline"
                >
                  Documentation Website
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="flex">
            <IoPeopleOutline className="size-6 text-dark shrink-0 mr-2" />
            <div>
              <p className="mb-0">8,900+ Customers</p>
              <p className="text-sm text-muted leading-1">
                Trusted and used by over 8,900+ customers worldwide.
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="flex">
            <IoChatbubblesOutline className="size-6 text-dark shrink-0 mr-2" />
            <div>
              <p className="mb-0">Premium Support</p>
              <p className="text-sm text-muted leading-1">
                Dedicated support team available,{" "}
                <Link
                  href="/support-policy"
                  target="_blank"
                  className="underline"
                >
                  Support Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFacts;
