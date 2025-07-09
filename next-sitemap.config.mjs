import fs from "fs";
import path from "path";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://themefisher.com/",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  additionalPaths: async () => {
    const result = [];

    // Add dynamic product pages
    const productsPath = path.join(process.cwd(), ".json/products.json");
    const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
    products.forEach((product) => {
      const fm = product.frontmatter || {};
      result.push({
        loc: `products/${product.slug}`,
        lastmod: fm.last_update || fm.date || undefined,
        changefreq: "weekly",
        priority: 0.7,
      });
    });

    // Add dynamic blog pages
    const postsPath = path.join(process.cwd(), ".json/posts.json");
    const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
    posts.forEach((post) => {
      const fm = post.frontmatter || {};
      result.push({
        loc: `${post.slug}`,
        lastmod: fm.last_update || fm.date || undefined,
        changefreq: "weekly",
        priority: 0.7,
      });
    });

    return result;
  },
  // more options: https://www.npmjs.com/package/next-sitemap
};

export default config;
