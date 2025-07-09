import { slugify } from "@/lib/utils/textConverter";
import { readingTime } from "lib/utils/readingTime";
import Link from "next/link";

const BlogCards = ({ blogs, hideReadingTime = false }) => {
  return (
    <>
      {blogs.map((blog, i) => (
        <div
          className={`${
            blogs.length == 4 &&
            `xl:col-3 ${i == 3 && "block lg:hidden xl:block"}`
          } lg:col-4 md:col-6 mt-8`}
          key={`blog-${i}`}
        >
          <div className="blog-post p-0 overflow-hidden border-0 rounded-lg">
            <Link href={`/${blog.slug}`} className="blog-post-img">
              {blog.frontmatter.image && (
                <div className="img-cover">
                  <img
                    width="430"
                    height="215"
                    className="rounded-top h-[215px] w-[430px] object-cover object-top"
                    src={blog.frontmatter.image}
                    alt={
                      blog.frontmatter.image_alt
                        ? blog.frontmatter.image_alt
                        : blog.frontmatter.title
                    }
                  />
                </div>
              )}
            </Link>

            <div className="blog-post-body p-6">
              {blog.frontmatter.sponsored && (
                <span className="blog-post-tag">Sponsored</span>
              )}
              <div className="blog-post-meta">
                By
                <Link
                  className="ml-1"
                  href={`/authors/${slugify(blog.frontmatter.author)}`}
                >
                  {blog.frontmatter.author}
                </Link>
                {!hideReadingTime && (
                  <>
                    <span className="mx-2">|</span>
                    {readingTime(blog.content)}
                  </>
                )}
              </div>
              <h2 className="blog-post-title">
                <Link href={`/${blog.slug}`}>{blog.frontmatter.title}</Link>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogCards;
