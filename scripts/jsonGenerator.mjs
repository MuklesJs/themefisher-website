import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const BLOG_FOLDER = "content/blog";
const THEME_FOLDER = "content/products";
const PUBLIC_FOLDER = "public";

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("_"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        // content: content,
      };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return publishedPages;
};

// get data from markdown
const getPublicData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("_"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth];

      const fmData = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        price: data.price,
        demo: data.demo,
        documentation: data.documentation,
        image: data.image,
        date: data.date,
        last_update: data.last_update,
        theme_version: data.theme_version,
        type: data.type,
        type_version: data.type_version,
        keywords: data.keywords,
        categories: data.categories,
        draft: data.draft,
      };

      return {
        group: group,
        slug: slug,
        frontmatter: fmData,
        content: content,
      };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return publishedPages;
};

// get data from markdown
const getCustomData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("_"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getCustomData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");

      // remap original data to custom data format
      const fmData = {
        title: data.title,
        description: data.description,
        demoUrl: `https://themefisher.com/demo?theme=${slug}`,
        affiliateUrl: `https://themefisher.com/products/${slug}/?aff=bRnek`,
        price: data.price,
        categories: {
          ssg: data.type ? [data.type.replace("bootstrap", "html")] : [],
          css: data.css ? [data.css] : [],
          archetype: Array.isArray(data.categories)
            ? data.categories
            : data.categories
              ? [data.categories]
              : [],
        },
      };

      return { slug: slug, frontmatter: fmData };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  // Convert array into custom object with slug keys.
  const customData = {};
  publishedPages.forEach((page) => {
    customData[`themefisher-${page.slug}`] = page.frontmatter;
  });
  return customData;
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files
  fs.writeFileSync(
    `${JSON_FOLDER}/posts.json`,
    JSON.stringify(getData(BLOG_FOLDER, 1)),
  );
  fs.writeFileSync(
    `${JSON_FOLDER}/products.json`,
    JSON.stringify(getData(THEME_FOLDER, 1)),
  );
  fs.writeFileSync(
    `${PUBLIC_FOLDER}/products.json`,
    JSON.stringify(getPublicData(THEME_FOLDER, 1)),
  );
  fs.writeFileSync(
    `${JSON_FOLDER}/custom-data.json`,
    JSON.stringify(getCustomData(THEME_FOLDER, 1)),
  );
} catch (err) {
  console.error(err);
}
