import React from 'react';
import './ProfileButton.css';
import avatar from '../../assets/icons/topbar/avatar.jpg';
import nick from '../../assets/icons/topbar/nick-vector.svg';

const ProfileButton = () => {
  return (
    <div className="profile-button">
      <div className="avatar-container">
        <img
          src={avatar}
          alt="Avatar"
          className="avatar"
        />
      </div>
      <span className="username">Артём</span>
      <img
        src={nick}
        alt="Arrow"
        className="arrow-icon"
      />
    </div>
  );
};

export default ProfileButton;
