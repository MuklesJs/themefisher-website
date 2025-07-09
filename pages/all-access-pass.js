import bundles from "@/config/bundle.json";
import Base from "@/layouts/Baseof";
import BundleBanner from "@/partials/Bundle/BundleBanner";
import BundleTable from "@/partials/Bundle/BundlePricing";
import BundleProducts from "@/partials/Bundle/BundleProducts";
import Faq from "@/partials/Faq";
import { getListPage, getSinglePages } from "lib/contentParser";

const AllAccessPass = ({
  allAccessPassPage: { frontmatter, content },
  allThemes,
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
    service_popup,
  } = frontmatter;

  const { themefisher_bundle } = bundles;

  const premiumThemes = allThemes.filter((theme) => theme.frontmatter.price);

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
      <BundleBanner
        title={title}
        banner_image={banner_image}
        description={description}
        bundleLength={premiumThemes.length}
        bundle={themefisher_bundle}
      />
      <BundleProducts products={premiumThemes} />
      <BundleTable type={"themefisher"} />
      <Faq faq={faq} />
    </Base>
  );
};

export default AllAccessPass;

export const getStaticProps = async () => {
  const allAccessPassPage = await getListPage(
    "content/landing-pages/all-access-pass.md",
  );
  const allThemes = await getSinglePages("content/products");
  return {
    props: {
      allAccessPassPage: allAccessPassPage,
      allThemes: allThemes,
    },
  };
};
