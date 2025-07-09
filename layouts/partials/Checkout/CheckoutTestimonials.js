import testimonials from "@/config/testimonial.json";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CheckoutTestimonials = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h3 className="text-h6 mb-4">What our customers say</h3>
      <div className="relative">
        <div className="relative">
          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".testimonial-prev",
                nextEl: ".testimonial-next",
              }}
              pagination={{
                clickable: true,
                el: ".testimonial-pagination",
                bulletClass: "testimonial-bullet",
                bulletActiveClass: "testimonial-bullet-active",
              }}
              spaceBetween={0}
              slidesPerView={1}
              style={{ paddingBottom: 0 }}
            >
              {testimonials.map((testimonial, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-theme-light rounded-lg p-5 md:p-6 flex flex-col gap-4 h-full w-full box-border">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <FaStar key={i} className="text-[#FFD600] text-xl" />
                      ))}
                    </div>
                    <blockquote className="italic mb-2">
                      “{testimonial.quote}”
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                      <div>
                        <h6 className="font-semibold text-dark">
                          {testimonial.name}{" "}
                          {testimonial.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Verified Customer
                            </span>
                          )}
                        </h6>
                        <span className="text-xs text-gray-500">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Swiper navigation buttons */}
          <button
            className="testimonial-prev absolute left-[-18px] top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center z-10"
            aria-label="Previous"
          >
            <FiChevronLeft className="text-2xl text-gray-400" />
          </button>
          <button
            className="testimonial-next absolute right-[-18px] top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center z-10"
            aria-label="Next"
          >
            <FiChevronRight className="text-2xl text-gray-400" />
          </button>
          {/* Swiper pagination dots */}
          <div className="testimonial-pagination flex justify-center gap-2 mt-6" />
          <style jsx global>{`
            .testimonial-pagination {
              display: flex !important;
              justify-content: center;
              gap: 8px;
              margin-top: 1rem;
            }
            .testimonial-bullet {
              width: 8px;
              height: 8px;
              border-radius: 9999px;
              background: #e5e7eb;
              display: inline-block;
              transition: all 0.2s;
              margin: 0 2px;
            }
            .testimonial-bullet-active {
              width: 20px;
              background: #000;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTestimonials;
