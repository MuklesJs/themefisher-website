import Badge from "@/components/Badge";
import { dateDiff, dateDistance } from "lib/utils/dateFormat";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

const DownloadProductCard = ({
  product,
  setChangelogPopupOpen,
  checkDownloadStatus,
  handleDownload,
}) => {
  return (
    product && (
      <div
        key={`product-${product?.slug}`}
        className="row mx-0 items-center justify-between border rounded-lg border-border py-6 md:px-3"
      >
        <Tooltip id="documentation" place="top" />
        <Tooltip id="demo" place="top" />
        <Tooltip id="download" place="top" />
        <div className="xl:col-5 mb-5 xl:mb-0 row mx-0 items-center">
          <div className="col-6 sm:col-7 md:col-5 lg:col-4 xl:col-5">
            <Image
              className="h-auto rounded border border-border"
              src={product?.image}
              width={240}
              height={180}
              alt={product?.title}
            />
          </div>

          <div className="col-6 sm:col-5 xl:col-7">
            <h4 className="mb-3 text-h5 notranslate font-semibold text-dark hover:text-primary">
              <Link className="mr-2" href={`/products/${product?.slug}`}>
                {product?.title}
              </Link>

              {dateDiff(new Date(), new Date(product?.release_date)) < 150 && (
                <Badge badge={"New"} type={"success"} />
              )}
            </h4>
            <small className="mb-1 block font-semibold">
              Version:{" "}
              <span className="font-normal text-light">
                {product?.theme_version}
              </span>
            </small>
            <small className="mb-2 block font-semibold">
              Updated:{" "}
              <span className="font-normal text-light">
                {dateDistance(new Date(product?.last_update))} ago
              </span>
            </small>
            <button
              onClick={() => setChangelogPopupOpen(product?.slug)}
              className="px-2 py-1.5 text-[12px] font-semibold bg-theme-light rounded border-0 "
            >
              Changelog
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M10.4932 5H8.5M10.4932 5V3M10.4932 5L8.82845 3.17157C7.26635 1.60948 4.73367 1.60948 3.17157 3.17157C1.60948 4.73367 1.60948 7.26635 3.17157 8.82845C4.73367 10.3905 7.26635 10.3905 8.82845 8.82845C9.32035 8.4365 9.51395 7.98345 9.7092 7.5M6 4.5V6.5L7.5 7.25"
                  stroke="#405460"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.4932 5H8.5M10.4932 5V3M10.4932 5L8.82845 3.17157C7.26635 1.60947 4.73367 1.60947 3.17157 3.17157C1.60947 4.73367 1.60947 7.26635 3.17157 8.82845C4.73367 10.3905 7.26635 10.3905 8.82845 8.82845C9.32035 8.4365 9.51395 7.98345 9.7092 7.5"
                  stroke="#B2B4BB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="xl:col-4 col-7 text-center">
          <div className="sm:w-[250px] max-w-full xl:mx-auto [zoom:0.7] sm:[zoom:1]">
            {checkDownloadStatus(product?.slug) ? (
              <div className="w-full h-[50px] bg-theme-light rounded-3xl flex items-center justify-center">
                <span className="text-sm">Already Downloaded</span>
              </div>
            ) : (
              <div className="w-full h-[50px] bg-theme-light rounded-3xl flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mr-1"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.81351 7.99967C2.81351 6.83745 3.2024 5.7656 3.85129 4.89967L11.0987 12.1471C10.2328 12.796 9.16092 13.1849 7.9987 13.1849C5.14018 13.1849 2.81351 10.8582 2.81351 7.99967ZM13.1839 7.99967C13.1839 9.1619 12.795 10.2338 12.1461 11.0997L4.8987 3.85226C5.76462 3.20338 6.83648 2.81449 7.9987 2.81449C10.8572 2.81449 13.1839 5.14115 13.1839 7.99967ZM7.9987 1.33301C4.31648 1.33301 1.33203 4.31745 1.33203 7.99967C1.33203 11.6819 4.31648 14.6663 7.9987 14.6663C11.6809 14.6663 14.6654 11.6819 14.6654 7.99967C14.6654 4.31745 11.6809 1.33301 7.9987 1.33301Z"
                    fill="#B2B4BB"
                  />
                  <path
                    d="M8.50001 5.52941C8.50001 5.23703 8.27614 5 8.00001 5C7.72387 5 7.50001 5.23703 7.50001 5.52941V9.19245L6.35355 7.97861C6.15829 7.77186 5.84171 7.77186 5.64645 7.97861C5.45118 8.18536 5.45118 8.52052 5.64645 8.72727L7.64647 10.8449C7.74021 10.9442 7.86741 11 8.00001 11C8.13261 11 8.25981 10.9442 8.35354 10.8449L10.3535 8.72727C10.5488 8.52052 10.5488 8.18536 10.3535 7.97861C10.1583 7.77186 9.84175 7.77186 9.64648 7.97861L8.50001 9.19245V5.52941Z"
                    fill="#152C48"
                  />
                </svg>
                <span className="text-sm">Not Downloaded Yet</span>
              </div>
            )}
          </div>
        </div>
        <div className="xl:col-3 col-5">
          <ul className="flex items-center justify-end space-x-3">
            <li
              data-tooltip-id="documentation"
              data-tooltip-content={"Documentation"}
            >
              <Link
                href={product?.documentation ? product?.documentation : "#"}
                target="_blank"
                className="h-[34px] xl:h-[60px] w-[34px] xl:w-[60px] rounded-full bg-theme-light  flex items-center justify-center"
              >
                <Image
                  src="/images/icons/docs.svg"
                  height={32}
                  width={32}
                  alt="docs"
                  className="h-[22px] xl:h-[32px]"
                />
              </Link>
            </li>
            <li data-tooltip-id="demo" data-tooltip-content={"Preview"}>
              <Link
                href={`/demo?theme=${product?.slug}`}
                target="_blank"
                className="h-[34px] xl:h-[60px] w-[34px] xl:w-[60px] rounded-full bg-theme-light  flex items-center justify-center"
              >
                <Image
                  src="/images/icons/demo.svg"
                  height={32}
                  width={32}
                  alt="demo"
                  className="h-[22px] xl:h-[32px]"
                />
              </Link>
            </li>
            <li data-tooltip-id="download" data-tooltip-content={"Download"}>
              <button
                className="h-[34px] xl:h-[60px] w-[34px] xl:w-[60px] rounded-full bg-theme-light  flex items-center justify-center"
                onClick={() => {
                  handleDownload(product.slug, product.download);
                }}
              >
                <Image
                  src="/images/icons/download.svg"
                  height={32}
                  width={32}
                  alt="download"
                  className="h-[22px] xl:h-[32px]"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default DownloadProductCard;
