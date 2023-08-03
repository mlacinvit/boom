import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import logo from '../../../assets/icons/logo.svg';
import './AppToolbar.css';

const AppToolbar = () => {
  const user = useSelector(state => state.users.user);
  return (
    <>
      <div className='mainbox'>
        <div className='elementbox'>
          <div className='logo'>
            <NavLink to="/">
              <img src={logo} alt='logo' width="50"/>
           
            </NavLink>
          </div>
          <div className='birka'>
            <p className='psevdo left'></p>
            <h1 className='logotext'>Boom shop</h1>
            <p className='psevdo right'></p>
          </div>
          <div>
            {user ? <UserMenu user={user} /> : <Anonymous />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppToolbar;