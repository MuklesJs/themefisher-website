import Link from "next/link";

const Download = ({ href, rel }) => {
  return (
    <Link
      href={href}
      target="_blank"
      button="true"
      rel={`noopener${
        href.includes("?ref=themefisher") ||
        href.includes("1.envato.market") ||
        href.includes("?ref=19") ||
        href.includes("?partner=104776") ||
        href.includes("?aff=themefisher")
          ? "sponsored"
          : ""
      } ${
        rel
          ? rel === "follow"
            ? ""
            : rel === "sponsored"
              ? "sponsored nofollow"
              : rel
          : "nofollow"
      }`}
      className="btn mb-4 mr-3  btn-primary"
    >
      More Info
    </Link>
  );
};

export default Download;
