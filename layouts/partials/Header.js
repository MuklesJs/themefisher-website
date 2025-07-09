import Announcement from "@/components/Announcement";
import Avatar from "@/components/Avatar";
import menu from "@/config/menu.json";
import { useCartContext } from "@/context/useCartContext";
import Logo from "@/layouts/components/Logo";
import { slugify } from "@/lib/utils/textConverter";
import { useUserContext } from "context/useUserContext";
import useOs from "hooks/useOs";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  RiDashboardHorizontalLine,
  RiFolderDownloadLine,
  RiHistoryLine,
  RiLockPasswordLine,
  RiLogoutBoxRLine,
  RiProfileLine,
  RiRadioButtonLine,
  RiTicket2Line,
} from "react-icons/ri";
import Mobilemenu from "./Mobilemenu";
const Search = dynamic(() => import("@/components/Search"));

// Inside the Header component
const Header = ({
  menuToggle,
  isMenuOpen,
  progress,
  isMenuFixed,
  headerClassName = "bg-white",
  setIsChatTriggered,
}) => {
  const { main, dashboard } = menu;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const router = useRouter();
  const macOs = useOs();
  const { data: session } = useSession();
  const { cartState } = useCartContext();
  const { userState } = useUserContext();
  const [announcementOpen, setAnnouncementOpen] = useState();
  const isDarkBg = router.asPath === "/deals";
  const isCheckoutPage = router.asPath.split("?")[0] === "/checkout";

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModalIsOpen(false);
      } else if (macOs && e.metaKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      }
    });
    if (macOs) {
      setKey("⌘K");
    } else {
      setKey("Ctrl K");
    }
  }, [modalIsOpen, macOs]);

  useEffect(() => {
    const searchInput = document.querySelector(
      'input[aria-label="search-open"]',
    );
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        setModalIsOpen(true);
      });
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener("focus", () => {
          setModalIsOpen(true);
        });
      }
    };
  }, []);

  // Calculate header height on component mount
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [announcementOpen]);

  // Page load check
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  // If Menu is active
  const isMenuActive = (url) => {
    let active = false;
    if (router.asPath === url) {
      active = true;
    }
    return active;
  };

  // If Menu children is active
  const isActiveChild = (mainMenu) => {
    let active = false;
    mainMenu.hasChildren &&
      mainMenu.children.forEach((child) => {
        if (router.asPath === child.url) {
          active = true;
        }
      });
    return active;
  };

  return (
    <>
      <header style={{ height: `${headerHeight}px` }}>
        <div
          ref={headerRef}
          className={`header-navigation ${headerClassName} ${isMenuFixed ? "!bg-none" : ""}`}
        >
          {!isCheckoutPage && (
            <Announcement
              setAnnouncementOpen={setAnnouncementOpen}
              announcementOpen={announcementOpen}
            />
          )}
          <nav className={`navbar-nav ${isCheckoutPage ? "my-2" : ""}`}>
            <Logo
              src={
                isDarkBg
                  ? "/images/logo/logo-white.svg"
                  : "/images/logo/logo.svg"
              }
            />

            {/* mobile actions */}
            <ul className="inline-flex items-center space-x-4 xl:hidden">
              <li>
                <button
                  title="Search"
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                  <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M8.96907 8.96387L13 13M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"
                      stroke={isDarkBg ? "#fff" : "#222"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <Link className="relative" href="/checkout">
                  <svg width="24" height="26" viewBox="0 0 12 14" fill="none">
                    <path
                      d="M0.75 3.50002L2.5 1.16669H9.5L11.25 3.50002M0.75 3.50002V11.6667C0.75 11.9761 0.872916 12.2729 1.09171 12.4916C1.3105 12.7104 1.60725 12.8334 1.91667 12.8334H10.0833C10.3928 12.8334 10.6895 12.7104 10.9083 12.4916C11.1271 12.2729 11.25 11.9761 11.25 11.6667V3.50002M0.75 3.50002H11.25"
                      stroke={isDarkBg ? "#fff" : "#222"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.33317 5.83334C8.33317 6.45218 8.08734 7.04567 7.64975 7.48326C7.21217 7.92084 6.61868 8.16668 5.99984 8.16668C5.381 8.16668 4.78751 7.92084 4.34992 7.48326C3.91234 7.04567 3.6665 6.45218 3.6665 5.83334"
                      stroke={isDarkBg ? "#fff" : "#222"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {cartState?.carts?.length > 0 && (
                    <small className="text-xs bg-[#FF2F2F] text-white absolute -top-1 -right-1 rounded-full h-4 w-4 text-center leading-4">
                      {cartState?.carts?.length}
                    </small>
                  )}
                </Link>
              </li>
              <li className="dash-menu">
                {session ? (
                  <>
                    <span className="cursor-pointer flex items-center">
                      <Avatar
                        src={userState.users?.image}
                        email={userState.users?.email}
                        alt="user image"
                        className="object-cover text-white size-[30px] rounded-full"
                        height={30}
                        width={30}
                      />
                    </span>
                    <div className="rounded-lg p-4 shadow bg-white dash-menu-items">
                      <div className="flex px-3 pb-3 items-center">
                        <div className="shrink-0">
                          <Avatar
                            src={userState.users?.image}
                            email={userState.users?.email}
                            alt="user image"
                            className="object-cover size-[40px] rounded-full inline-block mr-2"
                            height={40}
                            width={40}
                          />
                        </div>
                        <div className="ml-2">
                          <p className="font-semibold mb-0 leading-none">
                            {session?.user.first_name} {session?.user.last_name}
                          </p>
                          <small className="text-sm text-light leading-none mb-0">
                            {session?.user.email}
                          </small>
                        </div>
                      </div>
                      <ul className="dash-menu-list mb-2">
                        {dashboard.map((item) => (
                          <li key={item.name} className="dash-menu-list-item">
                            <Link
                              href={item.url}
                              className={`text-capitalize dash-menu-list-item-link nav-${slugify(
                                item.name,
                              )}`}
                            >
                              {item.icon === "download" ? (
                                <RiFolderDownloadLine className="mr-3 text-h4" />
                              ) : item.icon === "history" ? (
                                <RiHistoryLine className="mr-3 text-h4" />
                              ) : item.icon === "ticket" ? (
                                <RiTicket2Line className="mr-3 text-h4" />
                              ) : item.icon === "user" ? (
                                <RiProfileLine className="mr-3 text-h4" />
                              ) : item.icon === "security" ? (
                                <RiLockPasswordLine className="mr-3 text-h4" />
                              ) : item.icon === "customization" ? (
                                <RiDashboardHorizontalLine className="mr-3 text-h4 flex-none" />
                              ) : (
                                <RiRadioButtonLine className="mr-3 text-h4" />
                              )}
                              {item.name}
                              {item.tag && (
                                <span className="bg-[#F5E2E2] flex-none text-xs font-semibold text-red-500 rounded-full px-2 text-center py-px xl:ml-1 ml-2 2x:ml-2">
                                  {item.tag}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => signOut()}
                        className="text-capitalize w-full text-left dash-menu-list-item-link hover:text-red-600 hover:bg-[#fef1f5] text-red-600"
                      >
                        <RiLogoutBoxRLine className="mr-3 text-h4" />
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link href="/login">
                    <span className="mr-2">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M13.5837 14V12.6667C13.5837 11.9594 13.3027 11.2811 12.8026 10.781C12.3025 10.281 11.6242 10 10.917 10H5.58366C4.87641 10 4.19814 10.281 3.69804 10.781C3.19794 11.2811 2.91699 11.9594 2.91699 12.6667V14"
                          stroke={isDarkBg ? "#fff" : "#222"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.24967 7.33333C9.72243 7.33333 10.9163 6.13943 10.9163 4.66667C10.9163 3.19391 9.72243 2 8.24967 2C6.77692 2 5.58301 3.19391 5.58301 4.66667C5.58301 6.13943 6.77692 7.33333 8.24967 7.33333Z"
                          stroke={isDarkBg ? "#fff" : "#222"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="hidden xl:inline-block">Login</span>
                  </Link>
                )}
              </li>
              <li>
                <button title="Menu Toggler" onClick={menuToggle}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_1006_747)">
                      <path
                        d="M1.83281 0.0656242C0.99375 0.299999 0.290625 1.00781 0.0703125 1.85156C-0.0234375 2.19844 -0.0234375 21.8016 0.0703125 22.1484C0.295313 23.0016 1.00313 23.7094 1.85625 23.9344C2.04844 23.9859 3.87188 24 12.0188 24H21.9469L22.3031 23.8828C23.1188 23.6062 23.7234 22.9688 23.9391 22.1484C24.0328 21.8016 24.0328 2.19844 23.9391 1.85156C23.7141 0.998436 23.0063 0.290625 22.1531 0.0656242C21.8203 -0.0234394 2.15625 -0.0234394 1.83281 0.0656242ZM22.0219 1.13437C22.3828 1.27031 22.7344 1.62187 22.8703 1.98281L22.9734 2.25469V12V21.7453L22.8703 22.0172C22.7344 22.3781 22.3828 22.7297 22.0219 22.8656L21.75 22.9688H12.0047H2.25938L1.9875 22.8656C1.62656 22.7297 1.275 22.3781 1.13906 22.0172L1.03594 21.7453V12V2.25469L1.13906 1.98281C1.27031 1.62656 1.62656 1.27031 1.97344 1.13437L2.23125 1.03594H11.9906L21.75 1.03125L22.0219 1.13437Z"
                        fill={isDarkBg ? "#fff" : "#A1ABB6"}
                      />
                      <path
                        d="M6 7H18"
                        stroke={isDarkBg ? "#fff" : "#1A2B45"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 12H18"
                        stroke={isDarkBg ? "#fff" : "#1A2B45"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 17H18"
                        stroke={isDarkBg ? "#fff" : "#1A2B45"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1006_747">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </li>
            </ul>

            {/* desktop menu */}
            {!isCheckoutPage && (
              <ul className={`hidden items-center xl:flex`}>
                {main.map((menu, i) => (
                  <li
                    key={`main-${i}`}
                    className={`nav-item group ${
                      (isMenuActive(menu.url) ? "active" : "") ||
                      (progress && menu.name === "Blog" ? "active" : "")
                    } ${menu.hasChildren ? "nav-item-dropdown-icon" : ""} ${menu.name === "Deals" && "pr-12 before:right-auto before:2xl:left-[56%] before:lg:left-[54%] before:translate-x-px"} ${
                      isDarkBg && "before:border-white"
                    }`}
                  >
                    <Link
                      href={
                        session && menu.url_loggedin
                          ? menu.url_loggedin
                          : menu.url
                      }
                      target={menu.url?.includes("http") ? "_blank" : ""}
                      className={`nav-link nav-${slugify(menu.name)} ${isDarkBg && "!text-white"}`}
                      rel={menu.rel}
                    >
                      {menu.name}
                      {menu.name === "Deals" && (
                        <span className="bg-[#fe3434] text-[10px] font-medium text-white rounded-full px-1.5 text-center absolute right-3">
                          Offer
                        </span>
                      )}
                    </Link>

                    {menu.children && (
                      <div className={`mega-menu`}>
                        {menu.children.filter((d) => d.group === "ssg").length >
                          0 && (
                          <ul className="menu-child-pages">
                            {menu.children
                              .filter((d) => d.group === "ssg")
                              .map((child, i) => (
                                <li
                                  key={`child-${i}`}
                                  className={`mb-0 menu-item ${
                                    router.asPath == `${child.url}`
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  {child.image && (
                                    <Link
                                      href={`${child.url}`}
                                      rel={child.rel}
                                      className={`child-page-link capitalize flex items-center nav-${slugify(
                                        child.name,
                                      )} ${child?.highlight && "highlight"}`}
                                    >
                                      <Image
                                        className="w-12 h-12"
                                        src={child.image}
                                        alt={child.name}
                                        width="48"
                                        height="48"
                                        loading="eager"
                                      />
                                      <span className="ml-3">
                                        <span className="child-page-name block leading-tight">
                                          {child.name}
                                        </span>
                                        <span className="child-page-subtitle">
                                          {child.subtitle}
                                        </span>
                                      </span>
                                    </Link>
                                  )}
                                </li>
                              ))}
                          </ul>
                        )}

                        <ul className="menu-child-pages">
                          {menu.children
                            .filter((d) => d.group === "css")
                            .map((child, i) => (
                              <li
                                key={`child-${i}`}
                                className={`mb-0 menu-item ${
                                  router.asPath === `${child.url}`
                                    ? "active"
                                    : ""
                                }`}
                              >
                                {child.image && (
                                  <Link
                                    href={`${child.url}`}
                                    rel={child.rel}
                                    className={`child-page-link capitalize flex items-center nav-${slugify(
                                      child.name,
                                    )} ${child?.highlight && "highlight"}`}
                                  >
                                    <Image
                                      className="w-12 h-12"
                                      src={child.image}
                                      alt={child.name}
                                      width="48"
                                      height="48"
                                      loading="eager"
                                    />
                                    <span className="ml-3">
                                      <span className="child-page-name block leading-tight">
                                        {child.name}
                                      </span>
                                      <span className="child-page-subtitle">
                                        {child.subtitle}
                                      </span>
                                    </span>
                                  </Link>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
                <li className="ml-8">
                  <button
                    className="search-bar"
                    title="Search"
                    onClick={() => setModalIsOpen(!modalIsOpen)}
                  >
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      className="mr-2"
                    >
                      <path
                        d="M10 10.5L13 13.5"
                        stroke="#B7C3CB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 6.5C1 9.26142 3.23857 11.5 6 11.5C7.38308 11.5 8.63508 10.9384 9.54025 10.0308C10.4423 9.12642 11 7.87833 11 6.5C11 3.73857 8.76142 1.5 6 1.5C3.23857 1.5 1 3.73857 1 6.5Z"
                        stroke="#B7C3CB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mr-2">Search</span>
                    <span
                      className={`transition-all ml-auto duration-1000 rounded text-xs py-1 px-2 bg-theme-light ${
                        loaded ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      {key}
                    </span>
                  </button>
                </li>
              </ul>
            )}

            {/* desktop actions */}
            <ul className="xl:flex hidden items-center space-x-5">
              {/* chat trigger */}
              {isCheckoutPage && (
                <button
                  onClick={() => setIsChatTriggered(Math.random())}
                  className="flex items-center border border-border rounded px-3 py-1.5"
                >
                  <div className="assistant-users mb-0 mr-2 flex items-center justify-center">
                    <Image
                      className="rounded-full border-2 border-body"
                      src="/images/support-team/mehedi.png"
                      alt="mehedi"
                      height="32"
                      width="32"
                    />
                    <Image
                      className="rounded-full border-2 border-body"
                      src="/images/support-team/tuhin.png"
                      alt="tuhin"
                      height="32"
                      width="32"
                    />
                    <Image
                      className="rounded-full border-2 border-body"
                      src="/images/support-team/farhad.png"
                      alt="farhad"
                      height="32"
                      width="32"
                    />
                    <Image
                      className="rounded-full border-2 border-body"
                      src="/images/support-team/somrat.png"
                      alt="somrat"
                      height="32"
                      width="32"
                    />
                  </div>
                  Need help?
                </button>
              )}
              <li className={`checkout`}>
                <Link
                  href="/checkout"
                  className={
                    isCheckoutPage
                      ? "border border-border block py-2 px-3 rounded"
                      : ""
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0909 4H12.8182C11.5455 4 7.60795 4 6.45455 4C5.28125 4 6.19447 4 5.18182 4C4.16916 4 5.53977 4 5.18182 4C4.16916 4 4.28693 4.00008 5.18182 4H3.90909C3.40278 4 2.9172 4.20113 2.55916 4.55916C2.20113 4.9172 2 5.40278 2 5.90909V14.8182C2.00101 15.6618 2.33656 16.4705 2.93307 17.067C3.52954 17.6634 4.33824 17.999 5.18182 18H12.8182C13.6618 17.999 14.4705 17.6634 15.0669 17.067C15.6634 16.4705 15.999 15.6618 16 14.8182V5.90909C16 5.40278 15.7989 4.9172 15.4408 4.55916C15.0828 4.20113 14.5972 4 14.0909 4ZM14.7273 14.8182C14.7273 15.3245 14.5261 15.8101 14.1681 16.1681C13.8101 16.5261 13.3245 16.7273 12.8182 16.7273H5.18182C4.67551 16.7273 4.18993 16.5261 3.83189 16.1681C3.47386 15.8101 3.27273 15.3245 3.27273 14.8182V5.90909C3.27273 5.74033 3.33978 5.57846 3.4591 5.4591C3.57846 5.33978 3.74033 5.27273 3.90909 5.27273H5.18182C4.50568 5.27273 5.02273 5.27273 5.18182 5.27273C5.48011 5.27273 6.28579 5.27273 6.45455 5.27273C6.17614 5.27273 6.6233 5.27273 6.45455 5.27273C6.6733 5.27273 6.69318 5.27273 6.45455 5.27273H11.5455C11.3767 5.27273 11.7919 5.27273 11.5455 5.27273C11.7142 5.27273 12.7187 5.27273 12.8182 5.27273H14.0909C14.2597 5.27273 14.4215 5.33978 14.5409 5.4591C14.6602 5.57846 14.7273 5.74033 14.7273 5.90909V14.8182Z"
                      fill={isDarkBg ? "#fff" : "#000"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13 3.81818C13 2.80553 12.5786 1.83437 11.8284 1.11832C11.0783 0.402273 10.0609 0 9 0C7.93913 0 6.92171 0.402273 6.17158 1.11832C5.42142 1.83437 5 2.80553 5 3.81818V5.09091V5.15057V6.36364C5 6.53239 5.07025 6.69427 5.19525 6.81362C5.32029 6.93294 5.48988 7 5.66667 7C5.84346 7 6.01304 6.93294 6.13808 6.81362C6.26308 6.69427 6.33333 6.53239 6.33333 6.36364V5.09091V3.81818C6.33333 3.14308 6.61429 2.49564 7.11438 2.01827C7.61446 1.54091 8.29275 1.27273 9 1.27273C9.70725 1.27273 10.3855 1.54091 10.8856 2.01827C11.3857 2.49564 11.6667 3.14308 11.6667 3.81818V5.09091V6.36364C11.6667 6.53239 11.7369 6.69427 11.8619 6.81362C11.987 6.93294 12.1565 7 12.3333 7C12.5101 7 12.6797 6.93294 12.8048 6.81362C12.9298 6.69427 13 6.53239 13 6.36364V5.09091V3.81818Z"
                      fill={isDarkBg ? "#fff" : "#000"}
                    />
                  </svg>

                  {cartState?.carts?.length > 0 && (
                    <small
                      className={`text-sm align-bottom ${isDarkBg ? "text-white" : "text-primary"}`}
                    >
                      ({cartState?.carts?.length})
                    </small>
                  )}
                </Link>
              </li>

              {!isCheckoutPage && (
                <li className="dash-menu">
                  {session ? (
                    <>
                      <span
                        className={`cursor-pointer flex items-center notranslate ${isDarkBg ? "text-white" : "text-text"}`}
                      >
                        <Avatar
                          src={userState.users?.image}
                          email={userState.users?.email}
                          alt="user image"
                          className="object-cover rounded-full inline-block mr-2 size-[30px]"
                          height={60}
                          width={60}
                        />
                        Hi, {session?.user.first_name}
                        <svg
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          className="ml-1"
                        >
                          <path
                            d="M0.221958 0.206434C-0.0739861 0.478246 -0.0739861 0.918921 0.221958 1.1908L3.92928 4.59274C4.52128 5.13594 5.4805 5.13572 6.07211 4.59226L9.77806 1.1883C10.074 0.916415 10.074 0.47574 9.77806 0.203858C9.48214 -0.067953 9.0023 -0.067953 8.70638 0.203858L5.53445 3.11736C5.23853 3.38918 4.75877 3.38918 4.46277 3.11736L1.29365 0.206434C0.99771 -0.0654469 0.517894 -0.0654469 0.221958 0.206434Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <div className="rounded-lg p-4 shadow bg-white dash-menu-items">
                        <div className="flex px-3 pb-3 items-center">
                          <div className="shrink-0">
                            <Avatar
                              src={userState.users?.image}
                              email={userState.users?.email}
                              alt="user image"
                              className="object-cover rounded-full inline-block mr-2 size-[40px]"
                              height={40}
                              width={40}
                            />
                          </div>
                          <div className="ml-2">
                            <p className="font-semibold mb-0 leading-none">
                              {session?.user.first_name}{" "}
                              {session?.user.last_name}
                            </p>
                            <small className="text-sm text-light leading-none mb-0">
                              {session?.user.email}
                            </small>
                          </div>
                        </div>
                        <ul className="dash-menu-list mb-2">
                          {dashboard.map((item) => (
                            <li key={item.name} className="dash-menu-list-item">
                              <Link
                                href={item.url}
                                className={`text-capitalize dash-menu-list-item-link nav-${slugify(
                                  item.name,
                                )}`}
                              >
                                {item.icon === "download" ? (
                                  <RiFolderDownloadLine className="mr-3 text-h4" />
                                ) : item.icon === "history" ? (
                                  <RiHistoryLine className="mr-3 text-h4" />
                                ) : item.icon === "ticket" ? (
                                  <RiTicket2Line className="mr-3 text-h4" />
                                ) : item.icon === "user" ? (
                                  <RiProfileLine className="mr-3 text-h4" />
                                ) : item.icon === "security" ? (
                                  <RiLockPasswordLine className="mr-3 text-h4" />
                                ) : item.icon === "customization" ? (
                                  <RiDashboardHorizontalLine className="mr-3 text-h4 flex-none" />
                                ) : (
                                  <RiRadioButtonLine className="mr-3 text-h4" />
                                )}
                                {item.name}
                                {item.tag && (
                                  <span className="bg-[#F5E2E2] flex-none text-xs font-semibold text-red-500 rounded-full px-2 text-center py-px xl:ml-1 ml-2 2x:ml-2">
                                    {item.tag}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => signOut()}
                          className="text-capitalize w-full text-left dash-menu-list-item-link hover:text-red-600 hover:bg-[#fef1f5] text-red-600"
                        >
                          <RiLogoutBoxRLine className="inline-block mr-2" />
                          Log Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <Link href="/login" className="btn btn-outline-dark btn-xs">
                      <span className="mr-1 h-7 w-7 leading-7 rounded-full inline-block text-center">
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M13.5837 14V12.6667C13.5837 11.9594 13.3027 11.2811 12.8026 10.781C12.3025 10.281 11.6242 10 10.917 10H5.58366C4.87641 10 4.19814 10.281 3.69804 10.781C3.19794 11.2811 2.91699 11.9594 2.91699 12.6667V14"
                            stroke={"currentColor"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.24967 7.33333C9.72243 7.33333 10.9163 6.13943 10.9163 4.66667C10.9163 3.19391 9.72243 2 8.24967 2C6.77692 2 5.58301 3.19391 5.58301 4.66667C5.58301 6.13943 6.77692 7.33333 8.24967 7.33333Z"
                            stroke={"currentColor"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Login</span>
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {progress && (
            <div className="progressbar">
              <div
                className="progressbar-line h-[3px] bg-primary"
                id="progressbar"
              />
            </div>
          )}
        </div>

        <div
          className={`navigation-overlay ${
            isMenuOpen && "navigation-overlay-show"
          }`}
          onClick={menuToggle}
        />
        <Mobilemenu menuToggle={menuToggle} isMenuOpen={isMenuOpen} />
      </header>
      <Search modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default Header;
