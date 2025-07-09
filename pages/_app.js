import config from "@/config/config.json";
import { CartWrapper } from "@/context/useCartContext";
import { OrderWrapper } from "@/context/useOrderContext";
import { UserWrapper } from "@/context/useUserContext";
import { ENV, POSTHOG_KEY } from "@/lib/constant";
import { AppWrapper } from "context/state";
import { DownloadWrapper } from "context/useDownloadContext";
import countryDetector from "lib/utils/countryDetector";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "react-tooltip/dist/react-tooltip.css";
import "styles/style.scss";

const MyApp = ({ Component, pageProps }) => {
  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.site.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.site.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 12000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // posthog settings
  const country = countryDetector();
  const pathname = usePathname();
  const { disabled_countries, enable } = config.posthog;

  const posthogAllowedPathsIncludes = ["dashboard", "bundles"];
  const posthogAllowedProducts = /products\/(.*-astro|.*-nextjs|.*-hugo)/.test(
    pathname,
  );
  const posthogAllowedPaths = [
    "/",
    "/checkout",
    "/all-access-pass",
    "/reset-password",
    "/nextjs-templates",
    "/hugo-themes",
    "/astro-themes",
  ];

  useEffect(() => {
    // Initialize PostHog
    const initializePosthog = () => {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "development" &&
        enable &&
        country &&
        !disabled_countries.includes(country) &&
        (posthogAllowedPathsIncludes.includes(pathname.split("/")[1]) ||
          posthogAllowedProducts ||
          posthogAllowedPaths.some((path) => pathname === path))
      ) {
        posthog.init(POSTHOG_KEY, {
          api_host: "https://app.posthog.com",
          loaded: (posthog) => {
            if (ENV === "development") posthog.debug();
          },
        });

        // Remove the event listener after initialization to avoid multiple inits
        window.removeEventListener("mousedown", initializePosthog);
      }
    };

    // Add the event listener for mouse clicks
    window.addEventListener("mousedown", initializePosthog);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousedown", initializePosthog);
    };
  }, [country, pathname]);

  return (
    <PostHogProvider client={posthog}>
      <SessionProvider session={pageProps.session}>
        <AppWrapper>
          <CartWrapper>
            <OrderWrapper>
              <DownloadWrapper>
                <UserWrapper>
                  <Component {...pageProps} />
                </UserWrapper>
              </DownloadWrapper>
            </OrderWrapper>
          </CartWrapper>
        </AppWrapper>
      </SessionProvider>
    </PostHogProvider>
  );
};

export default MyApp;
