const getProductLink = (slug) => {
  const bundleUrls = {
    "bootstrap-bundle": `/bundles/bootstrap-bundle/`,
    "hugo-bundle": `/bundles/hugo-bundle/`,
    "astro-bundle": `/bundles/astro-bundle/`,
    "nextjs-bundle": `/bundles/nextjs-bundle/`,
    "themefisher-bundle": `/all-access-pass/`,
  };

  return bundleUrls[slug] || `/products/${slug}`;
};

export default getProductLink;
