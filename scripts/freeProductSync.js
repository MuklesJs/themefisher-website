require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
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
  const categories = data.categories;

  return {
    frontmatter: data,
    slug: slug,
    categories: categories,
  };
});

const freeProducts = products.filter((product) => !product.frontmatter.price);

freeProducts.map((theme) => {
  axios.post(
    `${BackendURL}/free-theme`,
    { name: theme.slug, download: 0 },
    {
      headers: {
        authorization_token: `Bearer ${Token}`,
      },
    },
  );
});
