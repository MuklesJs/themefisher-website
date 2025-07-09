import ProductCards from "@/components/ProductCards";
import config from "@/config/config.json";
import Base from "@/layouts/Baseof";
import { getAllCategory } from "@/lib/categoryParser";
import { getListPage, getSinglePages } from "@/lib/contentParser";
import { sortByDate, sortByWeight } from "@/lib/utils/sortFunctions";
import { slugify } from "lib/utils/textConverter";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCookie } from "react-use-cookie";
import MenuBar from "../../layouts/components/MenuBar";
import { defaultFilterValue, sidebarMenu } from "../../lib/data/menu";

const Shop = ({ products, categories, indexData }) => {
  const sectionRef = useRef(null);
  const { name } = config.announcement;
  const { title, meta_title, image, description, custom_dev_page } =
    indexData.frontmatter;

  const filterByWeight = products.filter(
    (product) => product.frontmatter.weight > 0,
  );
  const productsByWeight = sortByWeight(filterByWeight);
  const productsByDate = sortByDate(products);
  const filterWeightProducts = productsByDate.filter(
    (product) => !productsByWeight.includes(product),
  );
  const allProducts = [...productsByWeight, ...filterWeightProducts];
  const [isOpen, setOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState();
  const [fillerData, setFillerData] = useState(defaultFilterValue);
  const filterProducts = useMemo(() => {
    setOpen(false);
    let filteredProducts = allProducts;
    const { price, siteGenerators, categories, cssFrameWork } = fillerData;

    if (price !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        if (price === "free") {
          return product.frontmatter.price === 0;
        } else {
          return product.frontmatter.price !== 0;
        }
      });
    }

    if (siteGenerators !== "all") {
      if (siteGenerators === "html") {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            product.frontmatter.type.toLocaleLowerCase() === "tailwind" ||
            product.frontmatter?.type?.toLocaleLowerCase() === "bootstrap"
          );
        });
      } else {
        filteredProducts = filteredProducts.filter((product) => {
          const title = product.frontmatter.title.toLowerCase();
          const type = product.frontmatter.type.toLowerCase();
          return (
            title.includes(siteGenerators.toLowerCase()) ||
            type === siteGenerators.toLocaleLowerCase()
          );
        });
      }
    }

    if (categories !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        return product.frontmatter.categories.includes(
          categories.toLocaleLowerCase(),
        );
      });
    }

    if (cssFrameWork !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          product.frontmatter.type.toLocaleLowerCase() ===
            cssFrameWork.toLocaleLowerCase() ||
          product.frontmatter?.css?.toLocaleLowerCase() ===
            cssFrameWork.toLocaleLowerCase()
        );
      });
    }

    return filteredProducts;
  }, [fillerData]);

  useEffect(() => {
    if (sectionRef.current) {
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > sectionTop) {
        // Trigger your filter logic
        filterProducts;

        // Scroll to the section's top
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    }
  }, [JSON.stringify(fillerData)]);

  useEffect(() => {
    if (typeof announcementOpen !== "boolean") {
      const cookieValue = getCookie(slugify(name + "-announcement"));
      setAnnouncementOpen(
        cookieValue.length === 0 ? true : JSON.parse(cookieValue),
      );
    }
  }, [getCookie(slugify(name + "-announcement"))]);

  const menuContent = (
    <>
      <MenuBar
        name="siteGenerators"
        label={"Technology"}
        menus={sidebarMenu["site-generators"]}
        fillerData={fillerData}
        setFillerData={setFillerData}
      />
      <MenuBar
        name="categories"
        label={"Categories"}
        menus={sidebarMenu.categories}
        fillerData={fillerData}
        setFillerData={setFillerData}
      />
      <MenuBar
        name="cssFrameWork"
        label={"CSS Framework"}
        menus={sidebarMenu.cssFrameWorks}
        fillerData={fillerData}
        setFillerData={setFillerData}
      />
      <MenuBar
        name="price"
        label={"Pricing"}
        menus={sidebarMenu.pricing}
        fillerData={fillerData}
        setFillerData={setFillerData}
      />
    </>
  );

  return (
    <Base
      title={title}
      meta_title={meta_title}
      image={image}
      description={description}
      custom_dev_page={custom_dev_page}
    >
      <section ref={sectionRef} className="section pt-16">
        <div className="container">
          <div className="row">
            <div className="md:col-12 text-center mb-9">
              <h1 className="mb-3">{title}</h1>
              <p
                className="text-dark text-pretty max-w-[450px] w-full mx-auto"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>

          <div className="flex xl:hidden mx-auto justify-between mb-8">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-white rounded-md px-4 py-2 text-center shadow text-black"
            >
              <Image
                src={"/images/icons/filter.svg"}
                width={16}
                height={16}
                alt="filter-icon"
              />
              <span>Filter</span>
            </button>
            <input
              aria-label="search-open"
              className="form-input bg-white shadow h-auto w-auto py-1 px-4"
              placeholder="Search"
            />
          </div>

          <div className="flex gap-4">
            <div
              className={`after:fixed after:bg-black/40 after:left-0 after:top-0 after:w-full after:h-full after:backdrop-blur-sm after:z-30 ${isOpen ? "after:block" : "after:hidden"}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`mobile-menu ${isOpen ? "show" : ""}`}
              >
                <div className="bg-primary/10 py-4 px-6 flex justify-between">
                  <h2 className="text-[16px] font-bold">Filter</h2>
                  <svg
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                  </svg>{" "}
                </div>
                {menuContent}
              </div>
            </div>
            <div
              className={`w-[240px] hidden xl:block shadow py-8 space-y-4 rounded-md sticky left-0h-full overflow-y-auto ${announcementOpen ? "max-h-[calc(100svh-150px)] top-[150px]" : "top-[100px] max-h-[calc(100svh-117px)]"}`}
            >
              {menuContent}
            </div>
            <div className="flex-1">
              {filterProducts.length === 0 ? (
                <div className="text-center bg-white rounded-md shadow py-16 space-y-3 h-full">
                  <Image
                    src={"/images/icons/filter-no-match.svg"}
                    width={200}
                    height={200}
                    alt="No Match"
                    className="mx-auto"
                  />
                  <div className="max-w-md mx-auto space-y-3">
                    <h2 className="text-h4">No matching results found.</h2>
                    <p className="text-[#405460]">
                      Try adjusting your keywords or using different filters for
                      better results.
                    </p>
                    <button
                      onClick={() => setFillerData(defaultFilterValue)}
                      className="btn btn-sm btn-primary"
                    >
                      Reset search filters
                    </button>
                  </div>
                </div>
              ) : (
                <ProductCards
                  className={"!justify-start"}
                  products={filterProducts}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Shop;

export const getStaticProps = async () => {
  const allProducts = await getSinglePages("content/products", false);
  const allCategories = getAllCategory(allProducts);
  const indexData = await getListPage("content/products/_index.md");

  return {
    props: {
      products: allProducts,
      categories: allCategories,
      indexData: indexData,
    },
  };
};
