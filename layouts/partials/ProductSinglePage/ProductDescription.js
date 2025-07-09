import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

const ProductDescription = ({ mdxSource }) => {
  return (
    <div className="product-description">
      <MDXRemote {...mdxSource} components={shortcodes} />
    </div>
  );
};

export default ProductDescription;
