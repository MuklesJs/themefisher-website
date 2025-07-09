import config from "@/config/config.json";
import Base from "@/layouts/Baseof";
import BlogCards from "@/layouts/components/BlogCards";
import { readingTime } from "@/lib/utils/readingTime";
import { plainify, slugify } from "@/lib/utils/textConverter";
import shortcodes from "@/shortcodes/all";
import { dateFormat } from "lib/utils/dateFormat";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import BlogBundlePopup from "./components/BlogBundlePopup";

const BlogSinglePage = ({ blog, slug, mdxSource, similarItems }) => {
  const { frontmatter, content } = blog;
  const {
    title,
    date,
    description,
    author,
    meta_title,
    image,
    image_alt,
    noindex,
    sponsored,
    service_popup,
    last_update,
    categories,
  } = frontmatter;

  const { logo, site_url, meta_author } = config.site;
  const [progressbar, setProgressbar] = useState(true);
  const [scrollTopIcon, setScrollTopIcon] = useState(false);
  const [copyText, setCopyText] = useState(false);

  const copyLink = () => {
    let copyLinkText = document.getElementById("copyLinkText");
    copyLinkText.select();
    copyLinkText.setSelectionRange(0, 99999);
    setTimeout(() => {
      navigator.clipboard.writeText(copyLinkText.value);
    }, 100);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 2000);
  };

  useEffect(() => {
    const scrollToTopBtn = () => {
      if (window.pageYOffset >= 1000) {
        setScrollTopIcon(true);
      } else {
        setScrollTopIcon(false);
      }
    };
    const isBlogSingle = () => {
      if (window.pageYOffset >= 500) {
        setProgressbar(true);
      } else {
        setProgressbar(false);
      }
    };
    window.addEventListener("scroll", scrollToTopBtn);
    window.addEventListener("scroll", isBlogSingle);
    // smooth scroll for toc
    const tocBlock = document.querySelector(".toc");
    let style = window.getComputedStyle(tocBlock);
    let display = style.getPropertyValue("display");
    if (display === "none") {
      document.querySelector("#content").classList.add("no-toc");
    }

    const tocSmoothScroll = (e) => {
      if (tocBlock) {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains("toc-link")) {
          const id = target.getAttribute("href").slice(1);
          document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    tocBlock.addEventListener("click", tocSmoothScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const bundleName = categories
    .find((cat) => {
      const catLower = cat.toLowerCase();
      return ["astro", "nextjs", "hugo", "tailwind", "bootstrap"].includes(
        catLower,
      );
    })
    ?.toLowerCase();

  return (
    <Base
      progressbar={progressbar}
      title={title}
      meta_title={meta_title}
      description={description ? description : plainify(content.slice(0, 120))}
      image={image}
      noindex={noindex}
      chat={false}
      service_popup={service_popup}
    >
      <BlogBundlePopup bundle={bundleName} />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 xl:col-8">
              <h1 className="h2">{title}</h1>
              <div className="mb-8 mt-4 text-light">
                By{" "}
                <Link
                  href={`authors/${slugify(author)}`}
                  className="hover:text-primary"
                >
                  {author}
                </Link>
                <span className="mx-3">|</span>
                <time className="inline-block" dateTime={date}></time>
                <span> Last Updated: {dateFormat(last_update)}</span>
                <span className="mx-3">|</span>
                <span className="inline-block">
                  {content && readingTime(content)}
                </span>
                {sponsored && <span className="ml-3">Sponsored</span>}
              </div>

              <article className="blog-single mb-5">
                {image && (
                  <img
                    width="1200"
                    height="600"
                    className="rounded w-full object-cover mb-8"
                    src={image}
                    alt={image_alt ? image_alt : title}
                    decoding="async"
                  />
                )}
                <div id="content" className="content">
                  <MDXRemote {...mdxSource} components={shortcodes} />
                </div>
              </article>
              <div className="share-post">
                <ul className="list-none !pl-0">
                  <span className="font-semibold small inline-block">
                    SHARE
                  </span>
                  <li
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Tooltip on top"
                  >
                    <a
                      href={`https://facebook.com/sharer/sharer.php?u=${site_url}/${slug}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      button="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#3a589b"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${site_url}/${slug}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      button="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#2badee"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${site_url}/${slug}&title=${title}&summary=${description}&source=${site_url}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      button="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#1d7ab9"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://pinterest.com/pin/create/button/?url=${site_url}/${slug}&media=&description=${description}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      button="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#b7081b"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
                      </svg>
                    </a>
                  </li>
                  <li
                    className="text-center w-10 h-10 !inline-flex items-center justify-center cursor-pointer text-black/60 hover:text-black transition-all"
                    onClick={() => copyLink()}
                  >
                    <input
                      className="absolute visually-hidden"
                      type="text"
                      value={`${site_url}/${slug}`}
                      id="copyLinkText"
                      style={{ pointerEvents: "none", top: "-9999px" }}
                      readOnly
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className={`${copyText ? `hidden` : `inline-block`}`}
                    >
                      <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                      <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className={`${copyText ? `inline-block` : `hidden`}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                  </li>
                  <li
                    className={`small ${
                      copyText ? "!inline" : "!hidden"
                    } text-sm`}
                  >
                    Copied!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related post */}
      {similarItems.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="pb-3 text-center">
              <h2 className="h2">Related Posts</h2>
            </div>
            <div className="row gx-4 lg:gx-5 justify-center">
              <BlogCards blogs={similarItems} hideReadingTime={true} />
            </div>
          </div>
        </section>
      )}

      {/* schema */}
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
        {
          "@/context": "https://schema.org",
          "@type": "Article",
          "@id": "${site_url}/${slug}#content",
          "headline": "${title}",
          "description": "${
            description ? description : plainify(content.slice(0, 120))
          }",
          "image": "${image}",
          "url": "${site_url}/${slug}",
          "inLanguage": "en-US",
          "author": {
            "@type": "Person",
            "name": "${author}"
          },
          "publisher": {
            "@type": "Organization",
            "name": "${meta_author}",
            "url": "${site_url}",
            "sameAs": ["https://www.facebook.com/themefisher","https://twitter.com/themefisher","https://www.github.com/themefisher","https://dribbble.com/themefisher/","https://www.pinterest.com/themefisher/"],
            "logo": {
              "@type": "ImageObject",
              "url": "${logo}"
            }
          },
          "datePublished": "${date}"
        }
      `,
        }}
      />
      {scrollTopIcon && (
        <div
          className="fixed bottom-8 right-8 z-50 inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded border border-border bg-body"
          onClick={() => scrollToTop()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        </div>
      )}
    </Base>
  );
};

export default BlogSinglePage;
