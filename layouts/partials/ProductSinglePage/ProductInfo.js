import { dateDistance } from "@/lib/utils/dateFormat";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductInfo = ({ singleProduct, changelogData, downloadData }) => {
  const {
    title,
    date,
    license,
    type,
    last_update,
    type_version,
    theme_version,
    documentation,
    github,
  } = singleProduct.frontmatter;

  const [changelogPopupOpen, setChangelogPopupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.changelog === "show") {
      setChangelogPopupOpen(true);
    }
  }, [router.query.changelog]);

  return (
    <>
      <div className="theme-info rounded p-8 border">
        <h4
          id="themeInfo"
          className="theme-info-title text-center section-title mb-0 border-b border-border pt-0 pb-10 text-2xl before:bottom-6 before:top-auto"
        >
          Theme Information
        </h4>
        <ul className="mb-0">
          {downloadData > 0 && (
            <li>
              <span>
                Downloads
                <strong>:</strong>
              </span>
              <strong>{downloadData}</strong>
            </li>
          )}
          <li>
            <span>
              Updated
              <strong>:</strong>
            </span>
            <strong className="capitalize">
              {dateDistance(last_update)} ago
            </strong>
          </li>
          <li>
            <span>
              Released
              <strong>:</strong>
            </span>
            <strong className="capitalize">{dateDistance(date)} ago</strong>
          </li>
          {license && (
            <li>
              <span>
                License
                <strong>:</strong>
              </span>
              <strong>
                {license == "MIT" ? (
                  <Link
                    href={
                      github
                        ? `${github}/blob/main/LICENSE`
                        : "https://opensource.org/licenses/MIT"
                    }
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    MIT
                  </Link>
                ) : (
                  license
                )}
              </strong>
            </li>
          )}
          {type && (
            <li>
              <span>
                Product Type
                <strong>:</strong>
              </span>
              <strong>{type.toUpperCase()}</strong>
            </li>
          )}
          {type_version && (
            <li>
              <span className="capitalize">
                {type} Version
                <strong>:</strong>
              </span>
              <strong>{type_version}</strong>
            </li>
          )}
          <li>
            <span>
              Theme Version
              <strong>:</strong>
            </span>
            <strong>{theme_version}</strong>
          </li>
          {changelogData && (
            <li>
              <span>
                Changelog
                <strong>:</strong>
              </span>
              <div>
                <strong
                  className="change-log-btn inline-block"
                  onClick={() => setChangelogPopupOpen(true)}
                >
                  Show
                  <svg
                    width="7"
                    height="10"
                    viewBox="0 0 7 10"
                    fill="none"
                    className="me-0 ms-2 vertical-align-baseline"
                  >
                    <path
                      d="M1 1L5 5L1 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </strong>
              </div>
            </li>
          )}
          {type !== "framer" && (
            <li className="justify-content-center mt-5 !border-b-0 pt-5 text-center">
              <Link
                href={
                  documentation
                    ? documentation
                    : `https://docs.themefisher.com/${slugify(title)}/`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary mx-auto"
              >
                View Documentation
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* changelog popup */}
      {changelogData && (
        <div
          className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
            changelogPopupOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <span
            className="absolute top-0 left-0 -z-[1] h-full w-full"
            onClick={() => setChangelogPopupOpen(false)}
          ></span>
          <div className="overflow-hidden">
            <div className="absolute left-1/2 top-1/2 w-[96%] max-w-[700px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-body shadow-lg">
              <h3 className="border-b border-border px-6 pt-6 pb-4 md:px-8">
                Changelog
              </h3>
              <div className="max-h-[calc(100vh_-_300px)] overflow-y-auto px-6 py-8 md:px-8">
                {markdownify(changelogData.content, "div", "change-log-data")}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
