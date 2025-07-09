import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

// homepage-banner
const Banner = ({
  bannerData: { title, subtitle, button, hire_us_button },
  productCount,
}) => {
  const { hugo, bootstrap, jekyll, astro, nextjs, bulma } = productCount;

  return (
    <section className="banner">
      <div className="container">
        <div className="row text-center justify-center">
          <div className="lg:col-12">
            <div className="content-block w-fit mx-auto">
              <div className="relative z-20">
                {markdownify(
                  title,
                  "h1",
                  "text-[36px] lg:text-[42px] 2xl:text-[48px] leading-snug font-bold mb-6 font-primary [&>strong]:text-primary lg:max-w-[535px] xl:max-w-[600px] 2xl:max-w-[760px] [&>strong]:font-bold mx-auto",
                )}
                {markdownify(
                  subtitle,
                  "p",
                  "text-[15px] xl:text-[16px] 2xl:text-[18px] lg:max-w-[520px] xl:max-w-[580px] 2xl:max-w-[700px] mx-auto",
                )}
                {button.enable && (
                  <Link
                    href={button.link}
                    className="btn btn-primary text-capitalize btn-banner mt-8 mx-2"
                  >
                    {button.label}
                  </Link>
                )}
                {hire_us_button.enable && (
                  <Link
                    href={hire_us_button.link}
                    className="btn btn-outline-primary banner-hire-us text-capitalize btn-banner mt-8 mx-2"
                  >
                    {hire_us_button.label}
                  </Link>
                )}

                <div className="flex flex-wrap justify-center space-x-2 sm:space-x-3 mt-12">
                  <Link
                    href={"/bulma-templates"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/bulma.svg"
                      alt="bulma"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {bulma > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {bulma} PRODUCTS
                      </span>
                    )}
                  </Link>
                  <Link
                    href={"/astro-themes"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/astro.svg"
                      alt="astro"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {astro > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {astro} PRODUCTS
                      </span>
                    )}
                  </Link>
                  <Link
                    href={"/nextjs-templates"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/nextjs.svg"
                      alt="nextjs"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {nextjs > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {nextjs} PRODUCTS
                      </span>
                    )}
                  </Link>
                  <Link
                    href={"/hugo-themes"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/hugo.svg"
                      alt="hugo"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {hugo > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {hugo} PRODUCTS
                      </span>
                    )}
                  </Link>
                  <Link
                    href={"/jekyll-themes"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/jekyll.svg"
                      alt="jekyll"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {jekyll > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {jekyll} PRODUCTS
                      </span>
                    )}
                  </Link>
                  <Link
                    href={"/bootstrap-templates"}
                    className="icon-box block md:hidden !relative md:absolute"
                  >
                    <Image
                      src="/images/icons/bootstrap.svg"
                      alt="bootstrap"
                      width="42"
                      height="42"
                      className="icon"
                    />
                    {bootstrap > 0 && (
                      <span className="icon-tooltip">
                        <TooltipIcon /> {bootstrap} PRODUCTS
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              <div className="border-level-1">
                <span className="dot-1"></span>
                <span className="dot-2"></span>

                <Link
                  href="/bulma-templates"
                  className="icon-box hidden md:block 2xl:left-[-28px] lg:left-[-24px] left-0 top-[calc(50%_-_24px)]"
                >
                  <Image
                    src="/images/icons/bulma.svg"
                    alt="bulma"
                    width="48"
                    height="48"
                    className="icon"
                  />
                  {bulma > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {bulma} PRODUCTS
                    </span>
                  )}
                </Link>
                <Link
                  href="/astro-themes"
                  className="icon-box hidden md:block 2xl:right-[-37px] lg:right-[-30px] right-[10px] top-[calc(50%_-_37px)]"
                >
                  <Image
                    src="/images/icons/astro.svg"
                    alt="astro"
                    width="72"
                    height="72"
                    className="icon 2xl:w-[72px] 2xl:h-[72px] w-14 h-14"
                  />
                  {astro > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {astro} PRODUCTS
                    </span>
                  )}
                </Link>
              </div>
              <div className="border-level-2">
                <span className="dot-1"></span>
                <span className="dot-2"></span>

                <Link
                  href="/nextjs-templates"
                  className="icon-box hidden md:block 2xl:left-10 xl:left-10 md:left-8 left-8 top-9"
                >
                  <Image
                    src="/images/icons/nextjs.svg"
                    alt="nextjs"
                    width="72"
                    height="72"
                    className="icon 2xl:w-[72px] 2xl:h-[72px] w-14 h-14"
                  />
                  {nextjs > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {nextjs} PRODUCTS
                    </span>
                  )}
                </Link>
                <Link
                  href="/jekyll-themes"
                  className="icon-box hidden md:block 2xl:right-14 right-14 2xl:top-9 top-6"
                >
                  <Image
                    src="/images/icons/jekyll.svg"
                    alt="jekyll"
                    width="56"
                    height="56"
                    className="icon"
                  />
                  {jekyll > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {jekyll} PRODUCTS
                    </span>
                  )}
                </Link>
                <Link
                  href="/hugo-themes"
                  className="icon-box hidden md:block 2xl:left-12 2xl:bottom-11 left-14 lg:bottom-7 bottom-0"
                >
                  <Image
                    src="/images/icons/hugo.svg"
                    alt="hugo"
                    width="56"
                    height="56"
                    className="icon"
                  />
                  {hugo > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {hugo} PRODUCTS
                    </span>
                  )}
                </Link>
                <Link
                  href="/bootstrap-templates"
                  className="icon-box hidden md:block 2xl:right-18 2xl:bottom-9 right-16 lg:bottom-6 bottom-4"
                >
                  <Image
                    src="/images/icons/bootstrap.svg"
                    alt="bootstrap"
                    width="48"
                    height="48"
                    className="icon"
                  />
                  {bootstrap > 0 && (
                    <span className="icon-tooltip">
                      <TooltipIcon /> {bootstrap} PRODUCTS
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

export const TooltipIcon = () => {
  return (
    <svg
      className="mr-1 -mt-px"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.66748 2.08978C5.37041 2.21936 5.09827 2.48067 4.94028 2.78807C4.81861 3.02463 4.81475 3.20102 4.8317 7.67667L4.84937 12.3199L5.04572 12.5987C5.15371 12.7521 5.37185 12.9461 5.5305 13.0299L5.81899 13.1822H10.3927C14.791 13.1822 14.976 13.1774 15.2155 13.0551C15.5384 12.8903 15.8529 12.5285 15.9432 12.2176C15.9931 12.0464 16.009 10.5881 15.9953 7.44836L15.9756 2.92583L15.7951 2.65293C15.6958 2.50286 15.4918 2.29878 15.3418 2.19945L15.069 2.01881L10.4828 2.00434C6.49259 1.9917 5.86677 2.00283 5.66748 2.08978ZM11.0997 5.5217V6.89667H12.4741H13.8486V7.58415V8.27164H12.4741H11.0997V9.67934V11.087H10.4125H9.7253V9.67934V8.27164H8.31815H6.91101V7.58415V6.89667H8.31815H9.7253V5.5217V4.14673H10.4125H11.0997V5.5217ZM2.01754 9.92972L2.03508 15.0579L2.21565 15.3308C2.31494 15.4809 2.51894 15.6849 2.66895 15.7843L2.94174 15.9649L8.06788 15.9825L13.1941 16V15.2786V14.5572H8.31815H3.44223V9.67934V4.80148H2.72111H2L2.01754 9.92972Z"
        fill="currentCOlor"
      />
    </svg>
  );
};
