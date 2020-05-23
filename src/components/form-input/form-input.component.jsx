import React from "react";

import "./form-input.styles.scss";

// handleChange func, passed from sign-in and sign-up components, is needed to bubble up any change in the input
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {
      // selectively rendering a label. if a dev passes a label then it's generated otherwise there would be no label
      label ? (
        // apply className of shrink whenever the user types something in and will always have form-input-label
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null
    }
  </div>
);

export default FormInput;
