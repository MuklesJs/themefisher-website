import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SearchModal = ({ isOpen, toggle }) => {
  const pathname = usePathname();
  const modalRef = useRef < HTMLDivElement > null;
  const inputRef = useRef < HTMLInputElement > null;

  const handleKeyDown = (event) => {
    if (pathname === "/designs" || pathname === "/icons") {
      return;
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      inputRef.current?.focus();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`mobile-menu py-4 px-3 ${isOpen ? "show" : ""}`}>
      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-xl rounded-[8px] bg-white text-left shadow-lg dark:bg-transparent"
      >
        <div className="mb-0.5 flex w-full items-center justify-between"></div>
        <div className="p-[3px]">
          <div className="input-gradient max-h-[calc(100vh-250px)] overflow-y-auto rounded-[9px] border border-border">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
