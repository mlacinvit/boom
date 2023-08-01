import React from 'react';
import {NavLink} from "react-router-dom";
import '../AppToolbar.css';

const Anonymous = () => {
  return (
    <>
      <NavLink to="/register" className='element'>
        Sign Up
      </NavLink>
      <NavLink to="/login" className='element'>
        Sign In
      </NavLink>
    </>
  );
};

export default Anonymous;