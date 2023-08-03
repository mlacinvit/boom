import React from 'react';
import { apiUrl } from '../../config';
import './Avatar.css';

const Avatar = ({ user, click, wh }) => {
  let avatarImage;

  if (user?.avatar) {
    if (user?.avatar.match(/http/) || user?.avatar.match(/https/)) {
      avatarImage = user.avatar;
    } else if (user.avatar.includes('fixtures')) {
      avatarImage = `${apiUrl}/${user.avatar}`;
    } else {
      avatarImage = `${apiUrl}/uploads/${user.avatar}`;
    }
  } 

  return <img className={`avatar ${wh}`} src={avatarImage} alt={user?.username} onClick={click}/>

};

export default Avatar;
