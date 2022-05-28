import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <header className="app__header">
      <div className="wrapper">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Все котики</Link>
            </li>
            <li className="nav__item">
              <Link to="/favourites" className="nav__link">Любимые котики</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
