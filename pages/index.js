import config from "@/config/config.json";
import Base from "@/layouts/Baseof";
import { getListPage, getSinglePages } from "@/lib/contentParser";
import Banner from "@/partials/HomePage/Banner";
import Products from "@/partials/HomePage/Products";
import Script from "next/script";

const Home = ({ homePageData, products }) => {
  const { banner, service_popup } = homePageData.frontmatter;
  const { logo, title, meta_image, description, site_url, meta_author } =
    config.site;

  // categories products with their type and only get the length of each type
  const productType = products.map((product) => product.frontmatter.type);
  const productCount = productType.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return (
    <Base
      title={homePageData.frontmatter.title}
      description={homePageData.frontmatter.description}
      service_popup={service_popup}
      isHomePage={true}
      headerClassName="bg-[url(/images/noise.png)] bg-theme-gray"
    >
      <Banner bannerData={banner} productCount={productCount} />
      <Products products={products} type={"astro"} show={15} />
      <Products products={products} type={"nextjs"} show={9} />
      <Products products={products} type={"hugo"} show={9} />
      <Products products={products} type={"tailwind"} show={9} />
      <Products products={products} type={"bootstrap"} show={9} />

      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@/context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "${site_url}#webpage",
            "name": "${title}",
            "description": "${description}",
            "image": "${meta_image}",
            "inLanguage": "en-US",
            "publisher": {
              "@type": "Organization",
              "name": "${meta_author}",
              "url": "${site_url}",
              "sameAs": ["https://www.facebook.com/themefisher","https://twitter.com/themefisher","https://www.github.com/themefisher","https://dribbble.com/themefisher/","https://www.pinterest.com/themefisher/"],
              "logo": {
                "@type": "ImageObject",
                "url": "${logo}"
              }
            }
          }
        `,
        }}
      />
    </Base>
  );
};

export default Home;

export const getStaticProps = async () => {
  const homePageData = await getListPage("content/landing-pages/homepage.md");
  const products = await getSinglePages("content/products", false);

  return {
    props: {
      homePageData,
      products,
    },
  };
};
