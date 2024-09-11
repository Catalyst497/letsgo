import React, { useState, useRef, useEffect } from "react";

function DropdownInput({
  selectedValue,
  setSelectedValue,
  values,
  placeholder = "",
}) {
  // States
  const [inputOpen, setInputOpen] = useState(false);
  const [filteredValues, setFilteredValues] = useState([]);
  const dropdownRef = useRef(null);

  // Refs
  const inputRef = useRef(null);

  // Functions
  const handleInputClick = () => {
    setInputOpen(true);
  };
  const handleValueClick = (value) => {
    inputRef.current.value = value;

    setSelectedValue(value);
    setInputOpen(false);
  };
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setInputOpen(false);
    }
  };
  const handleInputChange = (e) => {
    setInputOpen(true);
    const value = e.target.value;
    // Make input value if it corresponds to a value
    const validValue = values.find((val) => val === value);
    if (validValue) {
      setSelectedValue(validValue);
      return setInputOpen(false);
    }

    // Do a search within the values
    const searchResults = values.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredValues(searchResults);
  };

  // useEffects
  useEffect(() => {
    setFilteredValues(values);
  }, [values]);
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
        ref={inputRef}
        type="text"
        // value={selectedValue}
        onClick={handleInputClick}
        onChange={handleInputChange}
        placeholder={placeholder}
        // readOnly
        className="w-full p-2 box-border"
      />
      {inputOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-full left-0 width-full border-[#ccc] border-[1px] shadow-md bg-white max-h-[150px] overflow-y-auto z-10"
        >
          {filteredValues?.map((value, index) => (
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
