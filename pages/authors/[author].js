import Base from "@/layouts/Baseof";
import { getRegularPages, getSinglePages } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Author = ({ author, allBlog, authorPost }) => {
  const postByauthor = allBlog.filter(
    (post) => slugify(post.frontmatter.author) == author,
  );
  const { title, image, description, social } = authorPost[0].frontmatter;
  return (
    <Base title={title}>
      <section className="section py-[100px]">
        <div className="container">
          <div className="row">
            <div className="md:col-12 text-center">
              <div className="inline-block rounded-full overflow-hidden shadow h-[200px]">
                <Image src={image} alt={title} height={200} width={200} />
              </div>
              <h1 className="mt-5">{title}</h1>
              <div className="mt-3">
                <p className="mb-0 text-[17px] text-dark font-medium">
                  {description}
                </p>
              </div>
              <ul className="social-icons mt-6">
                {social.map((icon, i) => (
                  <li className="!mr-6 leading-none" key={`socialMedia-${i}`}>
                    <Link
                      href={icon.link}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <Image
                        src={`${icon.icon}`}
                        height={20}
                        width={20}
                        alt="icon"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Author;

export const getStaticPaths = async () => {
  const authorData = getRegularPages("content/authors");
  const paths = authorData.map((slug) => ({
    params: {
      author: slugify(slug.slug),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { author } = params;
  const authorData = getRegularPages("content/authors");
  const authorPost = authorData.filter((data) => data.slug == author);
  const allBlog = await getSinglePages("content/blog", true);

  return {
    props: {
      author: author,
      allBlog: allBlog,
      authorPost: authorPost,
    },
  };
};
