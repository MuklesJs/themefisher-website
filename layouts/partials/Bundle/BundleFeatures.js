import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BundleFeatures = ({ type, products }) => {
  return (
    <section className="pt-[100px]" id="bundle-features">
      <div className="container">
        <div className="xl:columns-3 md:columns-2 columns-1 *:bg-theme-light *:break-inside-avoid-column *:rounded">
          {/* themes */}
          <div className="mb-4">
            <div className="p-5">
              <h3 className="text-h5 mb-4 capitalize">
                {Number(products.length)}+ {type} Themes
              </h3>
              <p className="text-light">
                Access all the templates you see in our collection, designed for
                businesses, saas, portfolio, and more.
              </p>
            </div>
            <Swiper
              className="swiper-linear"
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={3000}
              spaceBetween={0}
              slidesPerView={3}
              centeredSlides={true}
              loopedSlides={products.length}
            >
              {products.map((item, index) => (
                <SwiperSlide className="px-2 py-4" key={index}>
                  <Image
                    className="rounded shadow"
                    src={item.frontmatter.image}
                    alt={item.frontmatter.title}
                    width={160}
                    height={120}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              className="swiper-linear -mt-4"
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: 10,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              speed={3000}
              spaceBetween={0}
              slidesPerView={3}
              centeredSlides={true}
              loopedSlides={products.length}
            >
              {products.map((item, index) => (
                <SwiperSlide className="px-2 py-4" key={index}>
                  <Image
                    className="rounded shadow"
                    src={item.frontmatter.image}
                    alt={item.frontmatter.title}
                    width={160}
                    height={120}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* free access */}
          <div className="mb-4 p-5">
            <h3 className="text-h5 mb-4">
              Get free access to all upcoming templates.
            </h3>
            <p className="text-light">
              As a bundle user, you’ll receive free access to every new template
              we release.
            </p>
            <Image
              className="mt-4"
              src="/images/bundle/free-access.png"
              alt="alt"
              width={410}
              height={282}
            />
          </div>
          {/* happy customers */}
          <div className="mb-4 p-5">
            <Image
              src="/images/bundle/happy-customer.png"
              alt="alt"
              width={30}
              height={30}
              className="mb-4"
            />
            <h3 className="text-h5 mb-4">8900+ Happy Customers</h3>
            <p className="text-light">
              Join a community of satisfied users who rely on our platform to
              create stunning websites.
            </p>
          </div>
          {/* free updates */}
          <div className="mb-4 p-5 lg:hidden xl:block">
            <div className="p-4 rounded bg-white mb-4">
              <Image
                className="mx-auto"
                src="/images/bundle/free-updates.png"
                alt="alt"
                width={310}
                height={180}
              />
            </div>
            <h3 className="text-h5 mb-4">Free Updates</h3>
            <p className="text-light">
              Receive free updates for all templates, ensuring your websites
              remain secure, optimized, and packed with new features.
            </p>
          </div>
          {/* support */}
          <div className="mb-4 p-5">
            <Image
              src="/images/icons/support.svg"
              alt="alt"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-h5 mb-4">Premium Support</h3>
            <p className="text-light">
              Get expert support and guidance from our team, ensuring your
              experience is smooth and hassle-free.
            </p>
          </div>
          {/* new templates */}
          <div className="mb-4 p-5">
            <Image
              src="/images/bundle/new-template.png"
              alt="alt"
              width={230}
              height={140}
              className="mb-4"
            />
            <h3 className="text-h5 mb-4">New Templates Every Month</h3>
            <p className="text-light">
              Get new themes every month. Stay up-to-date with the latest
              stylish templates for your projects.
            </p>
          </div>
          {/* build project */}
          <div className="mb-4 p-5">
            <Image
              src="/images/icons/globe-site.svg"
              alt="alt"
              width={48}
              height={48}
              className="mb-4"
            />
            <h3 className="text-h5">
              Build personal or commercial projects, no restriction
            </h3>
          </div>
          {/* highly customizable */}
          <div className="mb-4 p-5">
            <Image
              src="/images/bundle/highly-customizable.png"
              alt="alt"
              width={290}
              height={170}
              className="mb-4"
            />
            <h3 className="text-h5 mb-4">Highly Customizable</h3>
            <p className="text-light">
              Tailor your website to perfectly match your brand. Our themes let
              you customize layouts, colors, fonts, & features with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleFeatures;
