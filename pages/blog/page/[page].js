import BlogCards from "@/components/BlogCards";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import Base from "@/layouts/Baseof";
import { getListPage, getSinglePages } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { plainify } from "@/lib/utils/textConverter";

const Blog = ({
  blogs,
  currentPage,
  indexData: { frontmatter, content },
  pagination,
}) => {
  const blogSortByDate = sortByDate(blogs);
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(blogSortByDate.length / pagination);
  const currentBlogs = blogSortByDate.slice(indexOfFirstPost, indexOfLastPost);

  const { title, meta_title, description, noindex, image, service_popup } =
    frontmatter;
  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description ? description : plainify(content.slice(0, 120))}
      image={image}
      noindex={noindex}
      service_popup={service_popup}
    >
      <section className="section pt-14 lg:pb-[100px]">
        <div className="container">
          <h1 className="text-center">{title}</h1>
          <div className="mt-5">
            <div className="row">
              <BlogCards
                blogs={currentBlogs}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            section="blog"
          />
        </div>
      </section>
    </Base>
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const allBlog = await getSinglePages("content/blog", false, true);

  const { pagination } = config.site;
  const totalPages = Math.ceil(allBlog.length / pagination);
  let paths = [];
  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        page: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.page) || 1);
  const { pagination } = config.site;
  const allBlog = await getSinglePages("content/blog", false, true);
  const indexData = await getListPage("content/blog/_index.md");

  return {
    props: {
      blogs: allBlog,
      currentPage: currentPage,
      indexData: indexData,
      pagination: pagination,
    },
  };
};
