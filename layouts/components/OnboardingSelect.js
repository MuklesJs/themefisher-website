import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function OnboardingSelect({ options, onSelect, isDropdownOpen, onToggle }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const COLLISION_PADDING = 10;

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && dropdownContentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const dropdownContentRect =
        dropdownContentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate space below and above with the collision padding
      const spaceBelow =
        viewportHeight - dropdownRect.bottom - COLLISION_PADDING;
      const spaceAbove = dropdownRect.top - COLLISION_PADDING;

      // Calculate space on the left and right with the collision padding
      const spaceOnRight =
        viewportWidth - dropdownRect.right - COLLISION_PADDING;
      const spaceOnLeft = dropdownRect.left - COLLISION_PADDING;

      // Determine vertical positioning (upward or downward)
      const shouldOpenUpwards =
        spaceBelow < dropdownContentRect.height &&
        spaceAbove >= dropdownContentRect.height;

      // Determine horizontal positioning (left or right)
      const shouldAlignLeft =
        spaceOnRight < dropdownContentRect.width &&
        spaceOnLeft >= dropdownContentRect.width;

      // Set the dropdown style based on the available space
      setDropdownStyle({
        top: shouldOpenUpwards
          ? `-${dropdownContentRect.height + 5}px`
          : "100%",
        bottom: "auto",
        left: shouldAlignLeft ? "auto" : 0,
        right: shouldAlignLeft ? 0 : "auto",
      });
    }
  };

  useEffect(() => {
    setSelectedValue(null);
  }, [options]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen]);

  return (
    <div
      className={`custom-select ${isDropdownOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={onToggle}
        className="custom-select-trigger"
      >
        <p
          className={`${!isDropdownOpen && selectedValue ? "text-dark" : ""} text-base`}
        >
          {selectedValue || "Select an option"}
        </p>
        <IoMdArrowDropdown />
      </button>
      <div
        ref={dropdownContentRef}
        className="custom-select-content"
        style={dropdownStyle}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              onSelect(option.value);
              setSelectedValue(option.label);
              onToggle(option.label);
            }}
            className={`custom-select-option ${selectedValue === option ? "active" : ""}`}
          >
            <button type="button" className="text-sm">
              {option.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingSelect;
