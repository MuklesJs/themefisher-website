const axios = require("axios");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const bundleData = require("../config/bundle.json");
require("dotenv").config();

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Token = process.env.NEXT_PUBLIC_TOKEN;
const getProducts = fs.readdirSync(path.join("content/products"));
const sanitizeProducts = getProducts.filter((theme) => theme.includes(".md"));
const removeProductIndex = sanitizeProducts.filter((theme) =>
  theme.match(/^(?!_)/),
);

const products = removeProductIndex.map((filename) => {
  const slug = filename.replace(".md", "");
  let product = fs.readFileSync(
    path.join(`content/products/`, filename),
    "utf-8",
  );
  let { data } = matter(product);
  const {
    title,
    image,
    price,
    demo,
    type,
    categories,
    author = "themefisher",
    download,
    documentation,
    date,
  } = data;

  return {
    slug,
    title,
    image,
    type,
    author,
    categories,
    packages: [
      {
        package: "single",
        price: price,
      },
      {
        package: "multiple",
        price: price + 20,
      },
    ],
    demo,
    download,
    documentation,
    release_date: date,
  };
});

const bundles = Object.values(bundleData).map((bundle) => {
  const {
    slug,
    title,
    image,
    type,
    categories,
    packages = [],
    release_date,
  } = bundle;

  return {
    slug,
    title,
    image,
    type,
    author: "themefisher",
    categories,
    packages: packages.map((pkg) => ({
      package: pkg.package,
      price: pkg.price,
    })),
    release_date: release_date,
  };
});

const insertTheme = async () => {
  [...bundles, ...products].map((product) => {
    axios.post(`${BackendURL}/product`, product, {
      headers: {
        authorization_token: `Bearer ${Token}`,
      },
    });
  });
};

insertTheme();
