import Assistant from "@/components/Assistant";
import CookieConsent from "@/components/CookieConsent";
import CustomDevPage from "@/components/CustomDevPage";
import config from "@/config/config.json";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import axios from "axios";
import { useCartContext } from "context/useCartContext";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

const Base = ({
  children,
  title,
  description,
  image,
  meta_title,
  progressbar,
  noindex,
  chat,
  service_popup,
  popupPage,
  headerClassName,
}) => {
  const [isChatTriggered, setIsChatTriggered] = useState("");
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: session, status } = useSession();
  const dbUser = session?.user;
  const router = useRouter();

  const isCheckoutPage = router.asPath.split("?")[0] === "/checkout";

  // posthog Identify logged in user
  const posthog = usePostHog();
  useEffect(() => {
    if (session) {
      posthog.identify(session?.user?.email);
    }
  }, [status]);

  useEffect(() => {
    const changeNavbarBackground = () => {
      if (window.pageYOffset >= 500) {
        setIsMenuFixed(true);
      } else {
        setIsMenuFixed(false);
      }
    };

    window.addEventListener("scroll", changeNavbarBackground);

    if (progressbar) {
      const progressbar = () => {
        var winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        var height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var progressbar = document.getElementById("progressbar");
        if (progressbar) {
          if (window.pageYOffset >= 500) {
            progressbar.style.width = scrolled + "%";
          } else {
            progressbar.style.width = "0%";
          }
        }
      };
      window.addEventListener("scroll", progressbar);
    }
  });

  // thrivedesk assistant chat
  useEffect(() => {
    try {
      let assistant = document.querySelector(".td-assistant");
      if (chat) {
        assistant.style.display = "block";
      } else {
        assistant.style.display = "none";
      }
    } catch (e) {}
  }, [chat]);

  // load cart
  const { cartDispatch } = useCartContext();
  useEffect(() => {
    cartDispatch({
      type: "ADD_CART",
      payload: JSON.parse(localStorage.getItem("cart")),
    });
  }, []);

  const { site_url, meta_image, meta_description, meta_author } = config.site;

  // partnero customer create
  useEffect(() => {
    if (status === "authenticated") {
      axios
        .post("/api/partnero", {
          email: dbUser.email,
          first_name: dbUser.first_name,
          last_name: dbUser.last_name,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  return (
    <div className={isMenuFixed && !progressbar ? "navigation-fixed" : ""}>
      <Head>
        {/* meta_title? meta_title : title */}
        <title>{meta_title ? meta_title : title}</title>
        {/* envato site verification */}
        <meta
          name="impact-site-verification"
          value="f9ae7421-ac29-4739-9b6e-e1255f963ed0"
        />
        {/* canonical url */}
        <link
          rel="canonical"
          href={`${site_url}${router.asPath.split("?")[0]}`}
          itemProp="url"
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        {/* description ? description : first 120 char from content */}
        <meta
          name="description"
          content={description ? description : meta_description}
        />
        {/* author from config.json */}
        <meta name="author" content={meta_author} />
        {/* meta_title? meta_title : title */}
        <meta property="og:title" content={meta_title ? meta_title : title} />
        {/* description ? description : first 120 char from content */}
        <meta
          property="og:description"
          content={description ? description : meta_description}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${site_url}${router.asPath.split("?")[0]}`}
        />
        {/* meta_title? meta_title : title */}
        <meta name="twitter:title" content={meta_title ? meta_title : title} />
        {/* description ? description : first 120 char from content */}
        <meta
          name="twitter:description"
          content={description ? description : meta_description}
        />
        {/* image meta */}
        <meta
          property="og:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta
          name="twitter:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        {/* google site verification */}
        <meta
          name="google-site-verification"
          content="oXVKxXr5YPxe5AxcPP0ZLV0uaaPeST4ycMYEDiepODY"
        />
      </Head>
      {!popupPage && (
        <>
          <Header
            menuToggle={menuToggle}
            isMenuOpen={isMenuOpen}
            progress={progressbar}
            isMenuFixed={isMenuFixed}
            headerClassName={headerClassName}
            setIsChatTriggered={setIsChatTriggered}
          />
        </>
      )}
      {children}
      <CookieConsent />
      {service_popup && <CustomDevPage />}
      {!popupPage && !isCheckoutPage && <Footer />}
      <Assistant enable={chat} openTrigger={isChatTriggered} />
    </div>
  );
};

export default Base;
