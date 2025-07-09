import { markdownify } from "@/lib/utils/textConverter";

const ChangelogModal = ({ changelogData, isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-[99999] h-screen w-screen backdrop-blur backdrop-brightness-75 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <span
        className="absolute top-0 left-0 -z-[1] h-full w-full"
        onClick={() => setIsOpen(false)}
      />
      <div className="overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[96%] max-w-[700px] -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-body shadow-lg">
          <h3 className="border-b border-border px-6 pt-6 pb-4 md:px-8">
            Changelog
          </h3>
          <div className="max-h-[calc(100vh_-_300px)] overflow-y-auto px-6 py-8 md:px-8">
            {markdownify(changelogData?.content, "div", "change-log-data")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangelogModal;
