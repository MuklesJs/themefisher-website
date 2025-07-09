import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AstroWelcome = ({ bundle }) => {
  const router = useRouter();
  const [welcomePopup, setWelcomePopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (bundle === "astro") {
      setWelcomePopup(
        router.query.aff === "ab" || router.query.aff === "abfeatured",
      );
    }
  }, [router.query.aff]);

  // press escape to close popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setWelcomePopup(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // click button to copy "astro-10" text
  const copyHandler = (code) => {
    setCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setWelcomePopup(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
        welcomePopup ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <span
        className="absolute top-0 left-0 -z-[1] h-full w-full"
        onClick={() => setWelcomePopup(false)}
      ></span>
      <div className="overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[96%] max-w-[650px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-astro shadow-lg">
          <div className="max-h-[calc(100vh_-_300px)] overflow-y-auto px-8 py-8 md:px-20 md:py-20 text-center">
            <div className="bg-gradient-to-r from-[#881ABD] to-[#1321AC] border border-white/30 rounded-md text-white py-1 px-5 inline-block mb-4">
              👋 Hey Astro Build Visitors!
            </div>
            <h4 className="text-white mb-4">
              Special discount exclusively for the Astro community.
            </h4>
            <p className="text-gray-400 mb-8">
              Enjoy a 10% discount on our all Astro products with code{" "}
              <span className="text-white">ASTROLOVE</span>
            </p>
            <button
              onClick={() => copyHandler("ASTROLOVE")}
              className="btn btn-sm btn-white"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroWelcome;
