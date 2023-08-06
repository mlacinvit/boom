import React from "react";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import {logoutUser} from '../../../../store/actions/usersActions';
import Avatar from "../../Avatar";
import '../AppToolbar.css';

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

useEffect(() => {
  if (show === true) {
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }
}, [show]);

  return (
    <div>
        {
          user.avatar &&
            <Avatar user={user} click={() => setShow(!show)} wh="wh2" />
        }
        {show 
          ? 
            <div className="profile">
              <div className="menu">
                <NavLink className="links" to="/profile">Edit profile</NavLink>
                <NavLink className="links" to="/newproduct/">New product</NavLink>
                <NavLink className="links" to="/myproduct">My product</NavLink>
                <NavLink className="links" onClick={() => dispatch(logoutUser())} to="/login">Logout</NavLink>
                <span className="span"></span>
              </div>
            </div> 
          : null
        }
    </div>
  );
};

export default UserMenu;
