import { useOrderContext } from "@/context/useOrderContext";
import themes from "@/json/products.json";
import { useEffect, useMemo, useState } from "react";

const extractTypeFromSlug = (slug) => {
  if (!slug) return "";
  const parts = slug.split("-");
  return parts[parts.length - 1];
};

const usePurchasedProducts = () => {
  const { orderState } = useOrderContext();
  const { success, orders } = orderState || {};

  const getAllThemes = themes.map((theme) => ({
    title: theme.frontmatter.title,
    slug: theme.slug,
    demo: theme.frontmatter.demo,
    download: theme.frontmatter.download,
    documentation: theme.frontmatter.documentation,
    categories: theme.frontmatter.categories,
    image: theme.frontmatter.image,
    theme_version: theme.frontmatter.theme_version,
    last_update: theme.frontmatter.last_update,
    type: theme.frontmatter.type,
    release_date: theme.frontmatter.date,
  }));

  // total earnings
  const totalEarnings =
    orders.length &&
    orders
      .filter((order) => order?.status !== "refunded")
      .reduce((acc, cur) => acc + Number(cur.earnings), 0);

  // sort by created date
  const allThemes = getAllThemes.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const bootstrapBundle = allThemes.filter(
    (theme) => theme.type === "bootstrap",
  );
  const hugoBundle = allThemes.filter((theme) => theme.type === "hugo");
  const astroBundle = allThemes.filter((theme) => theme.type === "astro");
  const nextjsBundle = allThemes.filter((theme) => theme.type === "nextjs");
  const tailwindBundle = allThemes.filter((theme) => theme.type === "tailwind");

  const getProductSlugs = useMemo(() => {
    const removeExpiresOrders = orders?.length
      ? orders.map((order) => ({
          products: order.products.filter(
            (product) =>
              !product.expires || new Date(product.expires) >= new Date(),
          ),
          status: order.status,
        }))
      : [];

    const orderProductSlugs = removeExpiresOrders
      .filter(
        (order) =>
          order.status !== "refunded" && order.status !== "partial-refunded",
      )
      .map((d) => d.products)
      .flat()
      .reverse()
      .filter(
        (obj, index, self) =>
          index === self.findIndex((d) => d.slug === obj.slug),
      );

    return orderProductSlugs;
  }, [orderState.orders]);

  const getBundleNames =
    getProductSlugs?.length > 0 &&
    getProductSlugs
      ?.filter((product) => product?.slug.includes("bundle"))
      .map((product) => product?.slug);

  const onlyProductSlugs =
    getProductSlugs?.length > 0 &&
    getProductSlugs?.filter(
      (product) =>
        !product?.slug.includes("bundle") &&
        product?.slug !== "premium-support" &&
        product?.slug !== "customization-service",
    );

  const onlyProducts =
    onlyProductSlugs.length > 0 &&
    allThemes?.filter((theme) =>
      onlyProductSlugs?.find((d) => d.slug === theme.slug),
    );

  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    setProducts(onlyProducts.length > 0 ? onlyProducts : []);
  }, [onlyProducts.length]);

  useEffect(() => {
    setBundles(getBundleNames?.length > 0 ? getBundleNames : []);
  }, [getBundleNames.length]);

  const purchasedProducts = [
    ...new Map(
      [
        ...(bundles.includes("bootstrap-bundle") ? bootstrapBundle : []),
        ...(bundles.includes("hugo-bundle") ? hugoBundle : []),
        ...(bundles.includes("astro-bundle") ? astroBundle : []),
        ...(bundles.includes("nextjs-bundle") ? nextjsBundle : []),
        ...(bundles.includes("tailwind-bundle") ? tailwindBundle : []),
        ...(bundles.includes("themefisher-bundle") ? allThemes : []),
        ...products,
      ].map((obj) => [obj.slug, obj]),
    ).values(),
  ];

  // total earnings by type
  const totalEarningsByType = (type) => {
    if (!orders?.length || !type) return 0;
    return orders
      .filter((order) => order?.status !== "refunded")
      .reduce((acc, order) => {
        const hasType = order.products.some(
          (product) => extractTypeFromSlug(product.slug) === type,
        );
        return hasType ? acc + Number(order.earnings) : acc;
      }, 0);
  };

  const returnObj = {
    totalEarnings,
    totalEarningsByType,
    purchasedProducts,
    purchasedBundles: bundles,
    purchasedLoaded: success,
  };

  return returnObj;
};

export default usePurchasedProducts;
