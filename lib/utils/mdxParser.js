import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";
import remarkGfm from "remark-gfm";

// mdx content parser
export const parseMDX = async (content) => {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [toc, { headings: ["h2", "h3", "h4"] }]],
      //more info for toc here https://github.com/JS-DevTools/rehype-toc
    },
  };
  return await serialize(content, options);
};
