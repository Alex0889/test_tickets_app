import React, { FC } from 'react';
import s from './Header.module.scss';
import logo from './logo.png';

const Header: FC = () => {
  return (
    <header className={s.root}>
      <img src={logo} alt='Logo' />
    </header>
  );
};

export default Header;
