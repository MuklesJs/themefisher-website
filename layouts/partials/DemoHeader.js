"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  TbArrowBackUp,
  TbDeviceDesktop,
  TbDeviceMobile,
  TbDeviceTablet,
} from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const DemoHeader = ({
  themes,
  showHeader,
  setShowHeader,
  device,
  setDevice,
  currentTheme,
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`z-50 bg-white w-full fixed transition-all ${
        !showHeader ? "top-[-64px]" : "top-0"
      }`}
    >
      <nav className="row px-5 py-2 justify-between items-center">
        {/* theme switcher */}
        <div className="col-6 lg:col-5">
          <div className="flex items-center">
            <button
              className="capitalize px-3 py-2 rounded border"
              onClick={() => setShowMenu(!showMenu)}
            >
              {currentTheme} <CgChevronDown />
            </button>
            <div
              className={`row absolute top-[70px] left-6 right-6 p-8 bg-white rounded shadow max-h-[calc(100vh-80px)] overflow-y-auto ${
                showMenu ? "flex" : "hidden"
              }`}
            >
              {themes.map((theme) => (
                <div
                  className="col-6 md:col-4 lg:col-3 2xl:col-2 mb-6"
                  key={theme.slug}
                >
                  <div className="card relative">
                    <div className="card-image">
                      <Image
                        src={theme.frontmatter.image}
                        alt={theme.frontmatter.title}
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="card-body py-3 text-center">
                      <button
                        onClick={() => {
                          router.push(`/demo?theme=${theme.slug}`);
                          setShowMenu(false);
                        }}
                        className="stretched-link notranslate"
                      >
                        {theme.frontmatter.title}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* device switcher */}
        <Tooltip id="desktop" place="top" />
        <Tooltip id="tablet" place="top" />
        <Tooltip id="mobile" place="top" />
        <div className="hidden text-center lg:col-2 lg:block">
          <div className="demo-preview-switcher">
            <button
              data-tooltip-id="desktop"
              data-tooltip-content={"Desktop"}
              className={`svg-block ${device === "desktop" && "active"}`}
              onClick={() => setDevice("desktop")}
            >
              <TbDeviceDesktop />
            </button>
            <button
              className={`svg-block ${device === "tablet" && "active"}`}
              data-tooltip-id="tablet"
              data-tooltip-content={"Tablet"}
              onClick={() => setDevice("tablet")}
            >
              <TbDeviceTablet />
            </button>
            <button
              className={`svg-block ${device === "mobile" && "active"}`}
              data-tooltip-id="mobile"
              data-tooltip-content={"Mobile"}
              onClick={() => setDevice("mobile")}
            >
              <TbDeviceMobile />
            </button>
          </div>
        </div>
        {/* info buttons */}
        <div className="col-6 lg:col-5">
          <div className="flex items-center justify-end space-x-3 pr-10">
            <Link
              href={`/products/${currentTheme}`}
              className="sm:py-3 py-2 px-4 rounded btn btn-primary leading-none"
            >
              <TbArrowBackUp className="text-2xl sm:hidden" />
              <span className="hidden sm:block">
                Back to Theme Details
                <TbArrowBackUp className="inline-block text-xl -mt-1 ml-1" />
              </span>
            </Link>
          </div>
        </div>
        {/* header toggler */}
        <span
          className={`absolute right-4 p-0 block h-7 w-7 shadow cursor-pointer border-border text-center ${
            showHeader
              ? "rounded-full border leading-6"
              : "top-[64px] bg-primary leading-5 text-white rounded-b"
          }`}
          onClick={() => setShowHeader(!showHeader)}
        >
          {showHeader ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      </nav>
    </header>
  );
};

export default DemoHeader;
