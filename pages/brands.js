import Base from "layouts/Baseof";
import { getListPage } from "lib/contentParser";
import { markdownify } from "lib/utils/textConverter";

const brands = ({ data }) => {
  const { frontmatter } = data;

  const white_brands_list = [
    "logo_mark_stroke_white",
    "logo_single_color_light",
    "full_logo_gradient_white",
    "full_logo_solid_white",
  ];

  const needsDarkBackground = (fileName) => {
    return white_brands_list.some((brandName) =>
      fileName.toLowerCase().includes(brandName.toLowerCase()),
    );
  };

  return (
    <Base {...data.frontmatter}>
      <section className="banner py-16 lg:py-32">
        <div className="container">
          <div className="row text-center justify-center">
            <div className="content-block w-fit mx-auto">
              <div className="relative z-20">
                {markdownify(frontmatter.title, "h1", "")}
                {markdownify(frontmatter.description, "p", "pb-14 pt-4")}
              </div>

              <div className="border-level-1"></div>
              <div className="border-level-2"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row g-4">
            {frontmatter?.assets.map((asset, index) => (
              <div
                className="sm:col-6 md:col-4 lg:col-3 mb-8 last:mb-0"
                key={index}
              >
                <figure
                  className={`shadow rounded aspect-video flex items-center justify-center px-6 ${
                    needsDarkBackground(asset.files[0])
                      ? "bg-[#010331]"
                      : "bg-transparent"
                  }`}
                >
                  <img src={asset.files[0]} alt={asset.title} />
                </figure>

                <div className="mt-4">
                  <h2 className="font-secondary h5 mb-2 font-medium">
                    {asset.title}
                  </h2>
                  <div className="flex gap-2">
                    <a
                      href={asset.files[0]}
                      download
                      className="px-2 py-px btn-outline-primary rounded-full flex items-center gap-1"
                    >
                      PNG
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1.49982V8.62482"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.625 5.24982L6 8.62482L9.375 5.24982"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.875 10.1248H10.125"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href={asset.files[1]}
                      download
                      className="px-2 py-px btn-outline-primary rounded-full flex items-center gap-1"
                    >
                      SVG
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1.49982V8.62482"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.625 5.24982L6 8.62482L9.375 5.24982"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.875 10.1248H10.125"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/landing-pages/brands.md");
  return {
    props: {
      data: data,
    },
  };
};

export default brands;
