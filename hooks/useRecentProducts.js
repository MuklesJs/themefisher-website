import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRecentProducts = (themes) => {
  const [recentView, setRecentView] = useState("");
  const router = useRouter();

  useEffect(() => {
    setRecentView(
      localStorage.getItem("recentView") !== null
        ? localStorage.getItem("recentView")
        : "",
    );

    if (router.asPath.match("products")) {
      const recentProductsArray = [
        ...new Set((recentView + router.query.slug).split("+")),
      ].filter(Boolean);
      while (recentProductsArray.length > 5) {
        recentProductsArray.shift();
      }
      const updatedRecentView = recentProductsArray.join("+") + "+";
      setTimeout(() => {
        localStorage.setItem("recentView", updatedRecentView);
      }, 1500);
    }
  }, [recentView, router.asPath, router.query.slug]);

  const recentProductsArray = [...new Set(String(recentView).split("+"))];

  const filteredRecentProducts = themes.filter((theme) =>
    recentProductsArray.find(
      (product) => theme.slug === product && theme.slug !== router.query.slug,
    ),
  );

  const sortedRecentProducts = filteredRecentProducts.sort(
    (a, b) =>
      recentProductsArray.indexOf(a.slug) - recentProductsArray.indexOf(b.slug),
  );

  const recentProducts = sortedRecentProducts.reverse();

  return {
    recentProducts,
  };
};

export default useRecentProducts;
