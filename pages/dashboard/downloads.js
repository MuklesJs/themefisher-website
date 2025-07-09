import ChangelogModal from "@/components/ChangelogModal";
import DownloadProductCard from "@/components/DownloadProductCard";
import Loader from "@/components/Loader";
import UpgradePromotion from "@/components/UpgradePromotion";
import { useCartContext } from "@/context/useCartContext";
import Base from "@/layouts/Baseof";
import fs from "fs";
import useDownloadedProducts from "hooks/useDownloadedProducts";
import usePurchasedProducts from "hooks/usePurchasedProducts";
import useRecentProducts from "hooks/useRecentProducts";
import Axios from "lib/axios";
import { clearCart } from "lib/utils/cartManager";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import path from "path";
import { useEffect, useState } from "react";

const Downloads = ({ changelogData, session }) => {
  const { downloadedProducts, handleDownload } = useDownloadedProducts();
  const { purchasedProducts, purchasedLoaded } = usePurchasedProducts();
  const { recentProducts } = useRecentProducts(purchasedProducts);
  const [categoryValue, setCategoryValue] = useState("all");
  const [products, setProducts] = useState([]);
  const [showRecentProducts, setShowRecentProducts] = useState(true);
  const [changelogPopupOpen, setChangelogPopupOpen] = useState("");
  const [loading, setLoading] = useState(true);
  const { cartDispatch } = useCartContext();
  const router = useRouter();

  const changelog = changelogData?.find(
    (data) => data?.slug === changelogPopupOpen,
  );

  // initial load products
  useEffect(() => {
    setProducts(purchasedProducts);
    setLoading(!purchasedLoaded);
  }, [purchasedProducts.length]);

  // get all categories list from products
  const categories = [
    ...new Set(
      purchasedProducts
        .map((product) => product?.categories?.map((category) => category))
        .flat(),
    ),
  ];

  // handle category filter
  const handleCategoryFilter = (category) => {
    setCategoryValue(category);
    if (category === "all") {
      setProducts(purchasedProducts);
      setShowRecentProducts(true);
    } else {
      setShowRecentProducts(false);
      setProducts(
        purchasedProducts.filter((product) =>
          product?.categories?.includes(category),
        ),
      );
    }
  };

  // handle search
  const handleSearch = (value) => {
    if (value === "") {
      setProducts(purchasedProducts);
      setShowRecentProducts(true);
    } else {
      setShowRecentProducts(false);
      setProducts(
        products.filter((product) =>
          product?.title.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  };

  // check download status
  const checkDownloadStatus = (slug) => {
    return downloadedProducts?.includes(slug);
  };

  // Clear cart if redirected after purchase
  useEffect(() => {
    if (router.query.purchase === "true") {
      clearCart(session, cartDispatch);
    }
  }, [router.query.purchase, session, cartDispatch]);

  return (
    <Base title="Purchased Products" chat={true}>
      <section className="section-sm">
        <div className="container">
          {/* customization service promotion */}
          {/* <ServicePromotion /> */}

          {/* bundle promotion */}
          <UpgradePromotion />

          {/* products */}
          <div className="bg-white rounded-lg shadow px-8 py-10 mb-8">
            {/* filter products */}
            <div className="flex space-x-2 justify-between items-center mb-10">
              <div className="relative">
                <input
                  type="search"
                  className="form-input h-[42px] pl-10 w-full xl:w-auto"
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute left-3 top-3"
                >
                  <path
                    opacity="0.1"
                    d="M13.25 7.25C13.25 10.5637 10.5637 13.25 7.25 13.25C3.93629 13.25 1.25 10.5637 1.25 7.25C1.25 3.93629 3.93629 1.25 7.25 1.25C10.5637 1.25 13.25 3.93629 13.25 7.25Z"
                    fill="#A1ABB6"
                  />
                  <path
                    d="M11.75 11.75L14.75 14.75"
                    stroke="#A1ABB6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.25 7.25C13.25 10.5637 10.5637 13.25 7.25 13.25C3.93629 13.25 1.25 10.5637 1.25 7.25C1.25 3.93629 3.93629 1.25 7.25 1.25C10.5637 1.25 13.25 3.93629 13.25 7.25Z"
                    stroke="#152C48"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <select
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="form-select capitalize h-[42px] max-w-[170px]"
                defaultValue={categoryValue}
              >
                <option value="all">All</option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* purchasedLoading */}
            {loading && (
              <div className="flex items-center justify-center py-6">
                <Loader />
              </div>
            )}

            {/* no product found */}
            {!loading && products?.length === 0 && (
              <div className="flex items-center justify-center py-6">
                <h3 className="font-primary text-h5">No Product Found</h3>
              </div>
            )}

            {/* recent products */}
            {!loading && recentProducts?.length > 0 && showRecentProducts && (
              <div className="space-y-6 mb-16">
                <h3 className="font-primary text-h5">
                  Recently Viewed Products
                </h3>
                {recentProducts?.map((product) => (
                  <DownloadProductCard
                    key={`recent-${product?.slug}`}
                    product={product}
                    setChangelogPopupOpen={setChangelogPopupOpen}
                    checkDownloadStatus={checkDownloadStatus}
                    handleDownload={handleDownload}
                  />
                ))}
              </div>
            )}

            {/* all products */}
            {!loading && products?.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-primary text-h5">All Products</h3>
                {products?.map((product) => (
                  <DownloadProductCard
                    key={`product-${product?.slug}`}
                    product={product}
                    setChangelogPopupOpen={setChangelogPopupOpen}
                    checkDownloadStatus={checkDownloadStatus}
                    handleDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <ChangelogModal
        changelogData={changelog}
        isOpen={changelogPopupOpen}
        setIsOpen={setChangelogPopupOpen}
      />
    </Base>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // get changelog data
  const changelogFiles = await new Promise((resolve, reject) => {
    fs.readdir(path.join(process.cwd(), "changelog"), (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  const sanitizeFile = changelogFiles.filter((file) => file.includes(".md"));
  const changelogPromises = sanitizeFile.map(async (filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");
    const changelogData = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(process.cwd(), "changelog", filename),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
    return {
      slug,
      content: changelogData,
    };
  });

  const changelogData = await Promise.all(changelogPromises);

  if (!session) {
    return {
      redirect: {
        destination: "/login?callbackUrl=" + context.resolvedUrl,
        permanent: false,
      },
    };
  }

  const userPersona = await Axios.get(
    `user-persona/public/${session?.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  );

  let hasOrder = false;
  if (session) {
    const fetchOrder = await Axios.get(`/order/${session?.user?.id}`, {
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    hasOrder = fetchOrder.data.result?.length > 0;
  }

  if (!userPersona.data.result?.user_id && hasOrder) {
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false,
      },
    };
  }

  return {
    props: { session, changelogData },
  };
};

export default Downloads;
