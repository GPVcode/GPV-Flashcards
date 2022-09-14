import React from "react";

function FormField({ inputType, name, value, placeholder, formChangeHandler }) {
  const labelTitle = name[0].toUpperCase().concat(name.slice(1)); //Capitalizes the first letter

  return (
    <div className="form-group">
      <label className="tg-text-light" htmlFor={name}>
        {labelTitle}
      </label>
      {/*If the inputType is a text area...*/}
      {inputType === "textarea" ? (
        <textarea
          className="form-control tg-bg-light"
          id={name}
          name={name}
          rows="4"
          placeholder={placeholder}
          value={value}
          onChange={formChangeHandler}
          required
        />
      ) : (
        /*Else, we are assuming the inputType is text*/
        <input
          className="form-control tg-bg-light"
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={formChangeHandler}
          required
        />
      )}
    </div>
  );
}

export default FormField;
