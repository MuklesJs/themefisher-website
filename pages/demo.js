import Loader from "@/components/Loader";
import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import DemoHeader from "@/partials/DemoHeader";
import { getSinglePages } from "lib/contentParser";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Demo = ({ themes }) => {
  const router = useRouter();
  const { favicon } = config.site;
  const [showHeader, setShowHeader] = useState(true);
  const [device, setDevice] = useState("desktop");
  const [currentTheme, setCurrentTheme] = useState(router.query?.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (router.query.theme) {
      setCurrentTheme(router.query.theme.replace("/", ""));
    }
  }, [router.query.theme]);

  const selectedTheme = themes.filter(
    (theme) => theme.slug === currentTheme,
  )[0];

  const title = selectedTheme?.frontmatter.title;
  const demo = selectedTheme?.frontmatter.demo;

  return (
    mounted && (
      <>
        <Head>
          {/* title */}
          <title>{plainify(title)}</title>

          {/* favicon */}
          <link rel="shortcut icon" href={favicon} />

          {/* responsive meta */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />

          {/* noindex */}
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="bg-theme-light">
          {currentTheme ? (
            <>
              <DemoHeader
                themes={themes}
                demo={demo}
                showHeader={showHeader}
                setShowHeader={setShowHeader}
                device={device}
                setDevice={setDevice}
                currentTheme={currentTheme}
              />
              <div
                className={`demo-preview-wrapper ${
                  showHeader ? "mt-[60px] h-[calc(100vh-60px)]" : "h-[100vh]"
                }`}
              >
                <div
                  className={`demo-preview-content ${showHeader ? device : ""}`}
                >
                  <iframe
                    src={demo}
                    key={currentTheme}
                    id="theme-preview"
                    title="theme preview"
                    sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                    loading="lazy"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-screen h-screen justify-center items-center bg-body">
              <Loader />
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Demo;

export const getStaticProps = async () => {
  const themes = getSinglePages("content/products", false);

  return {
    props: {
      themes,
    },
  };
};
