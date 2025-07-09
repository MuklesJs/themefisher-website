import ImageFallback from "@/components/ImageFallback";
import config from "@/config/config.json";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_width, logo_height, title } = config.site;

  return (
    <Link href="/" className="navbar-brand block -mt-3">
      {src || logo ? (
        <ImageFallback
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={src ? src : logo}
          alt={title}
          priority
          style={{
            height: src ? "auto" : logo_height.replace("px", "") + "px",
            width: logo_width.replace("px", "") + "px",
          }}
        />
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
