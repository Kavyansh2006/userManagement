import React, { useState, useEffect, useRef } from "react";

function Dropdown({ label, name, value, options = [], onChange, disabled }) {

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const dropdownRef = useRef(null);

  //  Sync value ONLY when not typing
  useEffect(() => {
    if (!isTyping) {
      setSearch(value || "");
    }
  }, [value, isTyping]);

  //  Filter options
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  //  Select option
  const handleSelect = (option) => {
    onChange({
      target: { name, value: option },
    });

    setSearch(option);
    setIsTyping(false);
    setShow(false);
  };

  //  Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
        setIsTyping(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="form-group">

      <label>{label}</label>

      <input
        type="text"
        name={name}
        value={search}
        placeholder={`Select ${label}`}
        disabled={disabled}

        onFocus={() => {
          setShow(true);
          setIsTyping(true);
        }}

        onChange={(e) => {
          setSearch(e.target.value);
          setShow(true);
          setIsTyping(true);
        }}
      />

      {show && !disabled && (
        <div className="dropdown-list">

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="dropdown-item">
              No results found
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Dropdown;