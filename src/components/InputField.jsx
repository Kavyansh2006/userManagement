import React from "react";

function InputField({ label, name, value, onChange, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />

      <div className="error-text">
        {error}
      </div>
    </div>
  );
}


export default InputField;