/* eslint-disable react/no-unescaped-entities */
import { markdownify } from "@/lib/utils/textConverter";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

const Changelog = ({
  changelogData: { content, frontmatter },
  showChangelog,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (showChangelog) {
      setOpen(true);
    }
  }, [showChangelog]);

  return (
    <div className="text-start">
      <div className="flex justify-between mb-2.5">
        <span>Changelog</span>
        <span
          onClick={() => setOpen(!open)}
          aria-controls="changelog"
          aria-expanded={open}
          className="text-primary font-semibold cursor-pointer select-none"
        >
          {open ? "Hide" : "Show"}
        </span>
      </div>

      <Collapse in={open}>
        <div
          className="change-log px-[18px] max-h-[300px] overflow-auto bg-theme-light rounded-t"
          id="changelog"
        >
          {markdownify(content, "div", "mt-3")}
        </div>
      </Collapse>
    </div>
  );
};

export default Changelog;
