import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import logo from '../../../assets/icons/logo.svg';
import './AppToolbar.css';
import { historyPush } from '../../../store/actions/historyActions';
const push = historyPush();

const AppToolbar = () => {
  const user = useSelector(state => state.users.user);
  return (
    <>
      <div className='mainbox'>
        <div className='elementbox'>
          <div>
            <NavLink to="/">
              <img src={logo} alt='logo' width="50"/>
            </NavLink>
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