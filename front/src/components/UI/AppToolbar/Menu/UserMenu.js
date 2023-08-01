import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button>
        {
          user.avatar &&
            <img
              alt={user.userName}
              src={user.avatar}
              width="50"
            />
        }
      </button>
    </div>
  );
};

export default UserMenu;
