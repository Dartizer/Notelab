import React from 'react';
import './ProfileButton.scss';
import avatar from '../../assets/icons/topbar/avatar.jpg';
import nick from '../../assets/icons/topbar/nick-vector.svg';

const ProfileButton: React.FC = () => {
  return (
    <div className="profile-button" role="button" aria-label="Профиль пользователя Артём">
      <div className="avatar-container">
        <img
          src={avatar}
          alt="Аватар пользователя"
          className="avatar"
        />
      </div>
      <span className="username">Артём</span>
      <img
        src={nick}
        alt="Открыть меню профиля"
        className="arrow-icon"
      />
    </div>
  );
};

export default ProfileButton;
