import posts from "@/json/posts.json";
import BlogSinglePage from "@/layouts/BlogSinglePage";
import { similarPosts } from "@/lib/utils/similarItems";
import { Regular } from "layouts/Regular";
import { getSinglePageServer } from "lib/contentParser";
import { parseMDX } from "lib/utils/mdxParser";

const BlogAndRegularPage = ({ singlePage, isBlogPage, slug, mdxContent }) => {
  const similarItems = similarPosts(singlePage, posts, slug).slice(0, 3);

  return (
    <>
      {isBlogPage ? (
        <BlogSinglePage
          blog={singlePage}
          slug={slug}
          mdxSource={mdxContent}
          similarItems={similarItems}
        />
      ) : (
        <Regular page={singlePage} mdxSource={mdxContent} />
      )}
    </>
  );
};

// get single page on server side
export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  // check if blog or regular page
  const isBlogPage = posts.filter((post) => post.slug === slug).length > 0;

  const singlePage = isBlogPage
    ? await getSinglePageServer("content/blog", slug)
    : await getSinglePageServer("content/regular-pages", slug);

  // handle 404
  if (!singlePage) {
    return {
      notFound: true,
    };
  }

  const mdxContent = await parseMDX(singlePage.content);

  return {
    props: {
      slug: slug,
      singlePage: singlePage,
      mdxContent: mdxContent,
      isBlogPage: isBlogPage,
    },
  };
};

export default BlogAndRegularPage;
