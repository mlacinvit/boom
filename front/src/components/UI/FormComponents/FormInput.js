import React from 'react';

import './FormComponents.css';

const FormInput = ({ type, name, value, onChange, placeholder, required, error }) => (
  <>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={!error ? 'forminput' : 'forminputerror'}
    />
    {error && <div className="helper">{error ? <span>{error}</span> : null}</div>}
  </>
);

export default FormInput;
