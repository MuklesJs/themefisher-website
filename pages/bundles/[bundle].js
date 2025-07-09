import AstroWelcome from "@/components/AstroWelcome";
import Base from "@/layouts/Baseof";
import { getBundleData } from "@/lib/contentParser";
import BundleBanner from "@/partials/Bundle/BundleBanner";
import BundleFeatures from "@/partials/Bundle/BundleFeatures";
import BundlePricing from "@/partials/Bundle/BundlePricing";
import BundleProducts from "@/partials/Bundle/BundleProducts";
import Faq from "@/partials/Faq";
import { getSinglePages, getSinglePageServer } from "lib/contentParser";

const BundleSingle = ({
  singleBundleData: { bundleProduct, singleBundle },
}) => {
  const {
    title,
    description,
    meta_title,
    image,
    banner_image,
    noindex,
    chat,
    faq,
    type,
    service_popup,
  } = singleBundle.frontmatter;

  const content = singleBundle.content;
  const countLength = bundleProduct.length;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
      chat={chat}
      service_popup={service_popup}
    >
      <AstroWelcome bundle={type} />
      <BundleBanner
        title={title}
        banner_image={banner_image}
        description={description}
        bundleLength={countLength}
      />
      <BundleFeatures type={type} products={bundleProduct} />
      <BundleProducts products={bundleProduct} />
      <BundlePricing type={type} />
      <Faq faq={faq} />
    </Base>
  );
};

export default BundleSingle;

export const getStaticPaths = async () => {
  const allBundles = await getSinglePages("content/bundles");
  const paths = allBundles.map((bundle) => ({
    params: {
      bundle: bundle.slug,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { bundle } = params;
  const singleBundleData = await getBundleData(`content/bundles/${bundle}.md`);

  const singleProduct = await getSinglePageServer("content/products", bundle);

  return {
    props: {
      singleBundleData: singleBundleData,
      singleProduct,
    },
  };
};
