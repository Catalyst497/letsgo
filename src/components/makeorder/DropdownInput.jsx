import React, { useState, useRef, useEffect } from "react";

function DropdownInput({
  selectedValue,
  setSelectedValue,
  values,
  placeholder = "",
}) {
  const [inputOpen, setInputOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputClick = () => {
    setInputOpen(true);
  };
  const handleValueClick = (time) => {
    setSelectedValue(time);
    setInputOpen(false);
  };
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setInputOpen(false);
    }
  };

  useEffect(() => {
    if (inputOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputOpen]);


  return (
    <div className="relative w-full border-[1px] border-gray-300">
      <input
        type="text"
        value={selectedValue}
        onClick={handleInputClick}
        placeholder={placeholder}
        readOnly
        className="w-full p-2 box-border"
      />
      {inputOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-full left-0 width-full border-[#ccc] border-[1px] shadow-md bg-white max-h-[150px] overflow-y-auto z-10"
        >
          {values?.map((value, index) => (
            <li
              key={index}
              onClick={() => handleValueClick(value)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownInput;
