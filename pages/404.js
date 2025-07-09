import ImageFallback from "@/components/ImageFallback";
import Base from "@/layouts/Baseof";
import { markdownify } from "@/lib/utils/textConverter";
import { getListPage } from "lib/contentParser";
import Link from "next/link";

const PageNotFound = ({ notFoundData }) => {
  const { title, description, image } = notFoundData.frontmatter;
  return (
    <Base title="Page Not Found">
      <div className="section">
        <div className="container">
          <div className="row items-center justify-center">
            <div className="hidden lg:col-6 xl:col-5 lg:block">
              <ImageFallback
                height={490}
                width={750}
                src={image}
                alt="not found image"
              />
            </div>
            <div className="lg:col-6">
              <div className="text-center lg:text-start">
                {markdownify(title, "h2", "h1")}
                {markdownify(
                  description,
                  "p",
                  "text-xl mt-3 text-dark mb-8 leading-snug",
                )}
                <Link href={"/"} className="btn btn-primary">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default PageNotFound;

export const getStaticProps = async () => {
  const notFoundData = await getListPage("content/regular-pages/404.md");

  return {
    props: {
      notFoundData: notFoundData,
    },
  };
};
