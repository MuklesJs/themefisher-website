import { execSync } from "child_process";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getAllCategory } from "./categoryParser";
import { convertJSON } from "./utils/jsonConverter";
import { parseMDX } from "./utils/mdxParser";
const currentDate = new Date();

// get individual page
export const getListPage = async (file) => {
  const pageData = fs.readFileSync(path.join(file), "utf-8");
  const pageDataParsed = matter(pageData);
  const frontmatterString = JSON.stringify(pageDataParsed.data);
  const frontmatter = JSON.parse(frontmatterString);
  const content = pageDataParsed.content;
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get products and blog data
export const getSinglePages = (
  folder,
  dateFilter = false,
  isUpdateDate = false,
) => {
  const filesPath = fs.readdirSync(path.join(folder));
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/),
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatter = convertJSON(pageDataParsed.data);
    const content = pageDataParsed.content;
    const category = frontmatter.categories ? frontmatter.categories : [];
    // generate update Date
    const getUpdateDateFromGit = execSync(
      `git log --pretty=format:\"%ad\" -1 -- ${`${folder}/${filename}`}`,
      {
        encoding: "utf-8",
      },
    );
    const updateDate = isUpdateDate
      ? convertJSON(new Date(getUpdateDateFromGit))
      : null;

    return {
      frontmatter,
      slug,
      content,
      category,
      updateDate,
    };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page.slug !== "404" && page,
  );

  const filterByDate = dateFilter
    ? publishedPages.filter((d) => new Date(d.frontmatter.date) <= currentDate)
    : publishedPages;

  return filterByDate;
};

// regular page data (ex: author,changelog data)
export const getRegularPages = (folder) => {
  const regularFile = fs.readdirSync(path.join(folder));
  const sanitizeFile = regularFile.filter((file) => file.includes(".md"));
  const regularPost = sanitizeFile.map((filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");
    const regularData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const frontmatter = convertJSON(matter(regularData).data);
    const content = matter(regularData).content;
    return {
      slug,
      frontmatter,
      content,
    };
  });
  return regularPost;
};

// get themes pages
export const getThemesPages = async (path) => {
  const singlePage = await getListPage(path);
  const allProducts = getSinglePages("content/products");
  const themes = allProducts.filter(
    (data) => data.frontmatter.type === singlePage.frontmatter.type,
  );
  const categories = getAllCategory(themes);

  return {
    themes,
    singlePage,
    categories,
  };
};

// get bundle page data
export const getBundleData = async (path) => {
  const allData = getSinglePages("content/products");
  const singleBundle = await getListPage(path);
  const bundleProduct = allData.filter(
    (product) =>
      product.frontmatter.type === singleBundle.frontmatter.type &&
      product.frontmatter.price !== 0,
  );

  return {
    bundleProduct,
    singleBundle,
  };
};

// get single page on server side
export const getSinglePageServer = async (folder, slug) => {
  // handle page data
  try {
    const pageData = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(process.cwd(), folder, `${slug}.md`),
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
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;

    if (frontmatter.draft) {
      return null;
    }

    return {
      frontmatter: frontmatter,
      content: content,
    };
  } catch (err) {
    // redirect to not found page
    return null;
  }
};
