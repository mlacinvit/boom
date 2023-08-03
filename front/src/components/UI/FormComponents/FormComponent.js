import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput';
import './FormComponents.css'

const FormComponent = ({
  title,
  inputName,
  inputType,
  submit,
  value,
  onChange,
  typeForm,
  placeholderName,
  error,
  disabled,
  link
}) => {
  let form = null

const getFieldError = (error, fieldName) => {
    try {
      return error.errors ? error.errors[fieldName].message : error.message;
    } catch {
      return undefined;
    }
  };

  if (inputName) {
    form = inputName.map((name, index) => (
      <FormInput
        key={index}
        type={inputType[index]}
        placeholder={placeholderName[index]}
        name={name}
        value={value[name]}
        onChange={onChange}
        error={getFieldError(error, name)}
      />
    ));
  }
  return (
    <>
      <form onSubmit={submit} className="form">
        <h4 className="form_title">{title}</h4>
        {form}
        <button className='formbutton' disabled={disabled}>{typeForm}</button>
        <Link to={link.to} className="link">
          {link.title}
        </Link>
      </form>
    </>
  )
}

export default FormComponent
