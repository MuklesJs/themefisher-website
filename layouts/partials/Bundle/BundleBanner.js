import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const BundleBanner = ({ title, description, banner_image, bundleLength }) => {
  return (
    <section className="section pb-0 text-center">
      <div className="container">
        <div className="row">
          <div className="md:col-12 text-center mb-12">
            {markdownify(
              title.replace("<number>", bundleLength),
              "h1",
              "mb-4",
            )}
            {markdownify(description, "p", `text-[#888] text-xl mb-6`)}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href={"#bundle-pricing"}
                scroll={true}
                className="btn btn-primary w-[300px] max-w-full"
              >
                Get Access to All Themes

              </Link>
              <Link
                href={"#all-bundle-themes"}
                className="btn btn-outline-primary w-[300px] max-w-full popup-bundle-purchase"
              >
                Browse Themes & Demos

              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleBanner;
