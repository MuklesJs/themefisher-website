import Base from "@/layouts/Baseof";
import { plainify } from "@/lib/utils/textConverter";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

export const Regular = ({ page, mdxSource }) => {
  const {
    title,
    description,
    meta_title,
    image,
    noindex,
    chat,
    service_popup,
  } = page.frontmatter;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={
        description ? description : plainify(page.content.slice(0, 120))
      }
      image={image}
      noindex={noindex}
      chat={chat}
      service_popup={service_popup}
    >
      <section className="mb-20">
        <div className="container">
          <div className="row">
            <div className="lg:col-10 mx-auto">
              <div className="text-center pt-[70px] pb-16">
                <h1>{title}</h1>
              </div>
              <div className="content">
                <MDXRemote {...mdxSource} components={shortcodes} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};
