import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import { slugify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Mobilemenu = ({ menuToggle, isMenuOpen }) => {
  const { main } = menu;
  const router = useRouter();
  const [dropdowns, setDropdowns] = useState([]);

  const handleDropdown = (name) => {
    if (dropdowns.includes(name)) {
      setDropdowns(dropdowns.filter((item) => item !== name));
      menuToggle();
    } else {
      setDropdowns([...dropdowns, name]);
    }
  };

  return (
    <div className={`mobile-menu py-4 px-3 ${isMenuOpen && "show"}`}>
      <div className="flex items-center justify-between px-4">
        <Logo />
        <svg
          onClick={menuToggle}
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
        </svg>
      </div>
      <ul className="mb-0 mt-2">
        {main.map((menu, i) => (
          <li
            key={`main-${i}`}
            className={`nav-item ${
              menu.hasChildren && "nav-item-dropdown-icon cursor-pointer"
            } ${router.asPath === menu.url && "active"}`}
            onClick={() => menu.hasChildren && handleDropdown(menu.name)}
          >
            <Link
              href={menu.url}
              prefetch={false}
              className={`nav-${slugify(menu.name)} nav-link`}
              rel={menu.rel}
            >
              {menu.name}
            </Link>
            {menu.hasChildren && (
              <ul
                className={`nav-dropdown ${
                  dropdowns.includes(menu.name) && "dropdown-open"
                }`}
              >
                {menu.children.map((child, i) => (
                  <li
                    key={`child-${i}`}
                    className={`dropdown-item ${
                      router.asPath === `${child.url}` && "active"
                    }`}
                    onClick={() => menuToggle}
                  >
                    <Link
                      prefetch={false}
                      href={child.url}
                      className={`dropdown-link nav-${slugify(child.name)}`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mobilemenu;
