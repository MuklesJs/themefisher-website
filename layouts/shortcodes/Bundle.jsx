import Link from "next/link";

const Bundle = () => {
  return (
    <Link
      href="/bundle"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded overflow-hidden d-block lh-0 my-6 bundle-promotion-blog"
    >
      <img
        src="/blog-thumb/html-bundle.png"
        alt="Mega Template Bundle"
        height="900"
        width="1200"
      />
    </Link>
  );
};

export default Bundle;
