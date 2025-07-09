import Base from "layouts/Baseof";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function ThemeCustomize() {
  return (
    <Base>
      <section className="section-sm">
        <div className="container">
          <div className="max-w-[650px] mx-auto text-center mb-10">
            <h1 className="mb-3 h2">Theme Customization</h1>
            <p className="text-[#888]">
              Let us take care of your theme customization to perfectly reflect
              your brand identity, so you can focus on what truly
              matters—growing your business.
            </p>
          </div>

          <div className="xl:col-8 mx-auto">
            <div className="row g-5">
              <div className="col-12 lg:col-6">
                <BundleTable
                  name={"Basic"}
                  price={297}
                  features={[
                    "Customizing colors and brands",
                    "Modifying existing pages & sections",
                    "Removing unneeded pages & sections",
                    "95+ Google PageSpeed scores",
                    "Dedicated Developer",
                    "Dedicated project manager",
                    "Unlimited visual assets from Freepik",
                    "Delivery in 2-3 business days",
                  ]}
                  borderColor={"bg-[#EAEAEA]"}
                  textColor={"text-dark"}
                  subtitleTextColor={"text-gray-400"}
                  strokeColor={"text-success"}
                  className={"bg-theme-light/80"}
                />
              </div>

              <div className="col-12 lg:col-6">
                <BundleTable
                  name={"Advance"}
                  price={497}
                  subtitleTextColor={"text-gray-300"}
                  textColor={"text-white"}
                  className={
                    "bg-gradient-to-r from-[#3b7fb1] to-[#4ea7b9] rounded-xl text-center"
                  }
                  borderColor={"bg-[#4EA8B9]"}
                  strokeColor={"text-[#3FEE75]"}
                  features={[
                    "Customizing colors and brands",
                    "Adding new pages/sections",
                    "Modifying existing pages & sections",
                    "Removing unneeded pages & sections",
                    "95+ Google PageSpeed scores",
                    "Dedicated project manager",
                    "Unlimited visual assets from Freepik",
                    "Preferred Headless CMS setup",
                    "Optimize the site for SEO",
                    "Deploy to preferred platform",
                    "Delivery in 4-5 business days",
                  ]}
                  btnClassName={"bg-white text-primary hover:bg-white"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}

function BundleTable({
  name,
  price,
  features,
  className,
  textColor,
  subtitleTextColor,
  strokeColor,
  borderColor,
  btnClassName,
}) {
  return (
    <div
      className={`p-10 xl:p-8 h-full 2xl:py-10 2xl:px-10 rounded-xl text-center flex flex-col ${className}`}
    >
      <h2
        className={`h3 relative mb-6 pb-2 after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-4  after:rounded after:bg-primary after:content-[''] text-left font-bold ${textColor}`}
      >
        {name}
      </h2>
      <span className="block text-left font-secondary mb-3.5">
        <strong className={"text-[48px]" + " " + textColor}>${price}</strong>
      </span>
      <div className={`w-full h-px ${borderColor}`} />
      <p
        className={`text-base text-left text-semibold mt-4 mb-2.5 text-xl ${subtitleTextColor}`}
      >
        What's Included:
      </p>
      <ul className="*:py-1.5 text-left flex-1">
        {features.map((feature, i) => (
          <li key={i} className={textColor}>
            <CheckIcon
              stroke="currentColor"
              className={`inline-block mr-2.5 ${strokeColor}`}
            />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={"/custom-development"}
        className={`btn btn-primary mt-6 w-full lg:w-[300px] max-w-full popup-bundle-purchase justify-center mx-auto ${btnClassName}`}
      >
        <span>Get Started</span>
      </Link>
      <Link
        className={`text-base font-semibold capitalize mt-2.5 ${textColor}`}
        rel="nofollow"
        target="_blank"
        href="https://calendly.com/mehedi-sharif "
      >
        or book a Meeting
      </Link>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
    >
      <path
        fill="#0FB442"
        d="M6.729 14.087a.856.856 0 0 1-.626-.254L2.209 9.939a.874.874 0 0 1 0-1.252.874.874 0 0 1 1.253 0l3.287 3.267 7.806-7.787a.874.874 0 0 1 1.252 0c.352.353.352.9 0 1.253l-8.432 8.413a.933.933 0 0 1-.646.254Z"
      />
    </svg>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login?callbackUrl=" + context.resolvedUrl,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
