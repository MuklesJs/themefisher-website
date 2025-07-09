import { useAppContext } from "@/context/state";
import useRecentProducts from "hooks/useRecentProducts";
import { sortByWeight } from "lib/utils/sortFunctions";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";

const Search = ({ setModalIsOpen, modalIsOpen }) => {
  const { products } = useAppContext();
  const [searchData, setSearchData] = useState("");
  const searchInputRef = useRef(null);
  const { recentProducts } = useRecentProducts(products);

  useEffect(() => {
    modalIsOpen
      ? searchInputRef.current.focus()
      : (searchInputRef.current.value = ""),
      setSearchData("");
  }, [modalIsOpen, setSearchData, products]);

  // search filtering
  const searchFunction = (searchText, existingText) => {
    return searchText
      .split(" ")
      .map((data) => existingText.split(" ").includes(data))
      .includes(true);
  };

  let searchItem = products.filter((product) => {
    const searchString = searchData.toLowerCase();
    if (searchString === "") {
      return "";
    } else if (product.frontmatter.title.toLowerCase().includes(searchString)) {
      return product;
    } else if (
      searchFunction(searchString, product.frontmatter.title.toLowerCase())
    ) {
      return product;
    } else if (
      product.frontmatter.categories.find((c) => c.includes(searchString))
    ) {
      return product;
    } else if (
      searchString
        .split(" ")
        .find((c) => product.frontmatter.categories.includes(c))
    ) {
      return product;
    } else if (
      product.frontmatter.keywords.find((c) => c.includes(searchString))
    ) {
      return product;
    } else if (
      searchString
        .split(" ")
        .find((c) => product.frontmatter.keywords.includes(c))
    ) {
      return product;
    }
  });

  const sortProducts = sortByWeight(products);

  return (
    <div
      className={`fixed top-0 z-[500] w-full ${
        modalIsOpen ? `block` : "hidden"
      }`}
    >
      <div
        className="absolute h-screen w-screen top-0 left-0 z-[500] bg-black/30 backdrop-blur-sm"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="search-box z-[9999]">
        <div className="input-group p-2.5 border-bottom flex items-center border-b">
          <span className="absolute left-5 z-10" id="basic-addon1">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </span>
          <label
            htmlFor="search"
            className="visually-hidden absolute opacity-0"
          >
            Search
          </label>
          <input
            id="search"
            className="relative flex w-full items-center py-2.5 px-12 rounded border-0"
            defaultValue=""
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search theme"
            ref={searchInputRef}
          />
          <span
            className="ml-auto cursor-pointer self-center rounded border py-2 px-2 font-normal text-text text-sm hover:bg-theme-light lg:py-1.5 leading-none absolute right-5"
            onClick={() => setModalIsOpen(false)}
          >
            <span className="hidden sm:block">ESC</span>
            <span className="block sm:hidden">&#x2715;</span>
          </span>
        </div>
        <div className="max-h-[calc(100vh-260px)] overflow-y-auto overflow-x-hidden px-2 pt-6 sm:px-7">
          {searchData != "" && !searchItem.length && (
            <h4 className="h4 font-primary mt-6 mb-8 text-center text-muted font-normal text-[28px]">
              No results for
              <span className="text-primary">{` "${searchData}"`}</span>
            </h4>
          )}

          {searchData != "" && searchItem.length > 0 && (
            <h4 className="h4 mb-6 font-primary font-normal text-muted">
              Results for
              <span className="text-primary">{` "${searchData}"`}</span>
            </h4>
          )}

          {!searchItem.length && (
            <h4 className="font-primary h5 mb-6">
              {searchData != "" && !recentProducts.length ? (
                <span>Try Our </span>
              ) : searchData != "" && recentProducts.length ? (
                <span></span>
              ) : (
                ""
              )}
              {recentProducts.length
                ? "Recently viewed"
                : " Most popular themes"}
            </h4>
          )}

          <SearchResults
            products={searchItem}
            defaultData={
              recentProducts.length
                ? recentProducts.slice(0, 4)
                : sortProducts.slice(0, 4)
            }
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
