"use client";

import config from "@/config/config.json";
import { markdownify, slugify } from "lib/utils/textConverter";
import { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getCookie, setCookie } from "react-use-cookie";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Announcement = ({ announcementOpen, setAnnouncementOpen }) => {
  const { enable, contents, name, badge } = config.announcement;

  useEffect(() => {
    if (typeof announcementOpen !== "boolean") {
      const cookieValue = getCookie(slugify(name + "-announcement"));

      setAnnouncementOpen(
        cookieValue.length === 0 ? true : JSON.parse(cookieValue),
      );
    }
  }, []);

  return (
    enable &&
    announcementOpen && (
      <div className={`announcement-bar relative px-10 py-2 text-center`}>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
        >
          {contents.map((item, index) => (
            <SwiperSlide key={index}>
              <p className="mb-0 py-2">
                {badge && (
                  <span className="font-semibold px-4 py-1 rounded-2xl bg-white text-primary mr-3">
                    {badge}
                  </span>
                )}
                {markdownify(item, "span")}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl leading-none"
          onClick={() => {
            setCookie(slugify(name + "-announcement"), "false", {
              days: 7,
              SameSite: "Strict",
              Secure: true,
            });
            setAnnouncementOpen(false);
          }}
        >
          <RiCloseLine />
        </span>
      </div>
    )
  );
};

export default Announcement;
