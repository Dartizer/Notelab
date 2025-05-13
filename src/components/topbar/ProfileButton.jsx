import React from 'react';
import './ProfileButton.css';

const ProfileButton = () => {
  return (
    <div className="profile-button">
      <div className="avatar-container">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="avatar"
        />
      </div>
      <span className="username">Артём</span>
      <img
        src="/nick-vector.svg"
        alt="Arrow"
        className="arrow-icon"
      />
    </div>
  );
};

export default ProfileButton;
