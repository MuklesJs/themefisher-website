import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { socialMedia, brands, site } = config;
  const { footer } = menu;

  return (
    <footer className="bg-[#191c2d]">
      <div className="pt-[100px] pb-[50px]">
        <div className="container">
          <div className="row">
            {footer.map((item, i) => (
              <div
                className="col-6 mb-6 md:col-3 md:mb-0"
                key={`footer-menu-${i}`}
              >
                <h3 className="h6 footer-menu-title font-primary">
                  {item.name}
                </h3>
                <ul className="footer-menu">
                  {item.pages.map((page, i) => (
                    <li key={`page-${i}`}>
                      <Link href={page.url} prefetch={false} rel={page.rel}>
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="row items-center">
            <div className="col-12">
              <h3 className="h6 relative mb-4 text-white before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-full before:h-[1px] before:bg-white/10">
                <span className="bg-[#191c2d] pr-2 relative z-[1]">
                  Other Brands
                </span>
              </h3>
            </div>
            <div className="mb-8 sm:col-6 md:col-4 md:mb-0">
              <div className="flex">
                {brands.map((brand, i) => (
                  <div
                    className={` ${i == 0 ? "mr-4" : "mr-0 mt-2"}`}
                    key={`brands-${i}`}
                  >
                    <Link href={brand.url} target="_blank" rel={brand.rel}>
                      <Image
                        src={`${brand.logo}`}
                        alt={brand.name}
                        title={brand.name}
                        width="160"
                        height="57"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 sm:col-6 md:col-4 md:mb-0">
              <h3 className="h6 mb-4 text-white">Follow Us</h3>
              <ul className="social-icons  mt-1 p-0 mb-0">
                {socialMedia.map((icon, i) => (
                  <li
                    className={`mr-4 ${i == 0 ? "-ml-[6px]" : ""}`}
                    key={`socialMedia-${i}`}
                  >
                    <Link
                      href={icon.link}
                      className={`block p-[6px] hover:opacity-70 transition-all footer-${icon.name}`}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <Image
                        src={`${icon.icon}`}
                        height={20}
                        width={20}
                        alt={icon.name}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-end md:col-4 text-left md:text-right">
              <p className="text-[#939FA7]/80">
                {site.copyright.replace("<year>", new Date().getFullYear())}
              </p>
              <a
                href="https://sitepins.com/?utm_source=themefisher&utm_medium=widget&utm_campaign=crosspromo"
                target="_blank"
                rel="nofollow noreferrer"
                className="inline-block shadow mt-2"
              >
                <img
                  src="/images/manage-via-sitepins.svg"
                  alt="Manage via Sitepins"
                  width="180"
                  height="30"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
