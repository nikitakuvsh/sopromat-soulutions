import React from "react";
import './Header.css';

function Header(){
    return(
        <header className="header">
            <div className="header__container">
                <nav className="header__navbar">
                    <a className="navbar__link">Главная</a>
                    <a className="navbar__link">Как это работает?</a>
                    <a className="navbar__link">Решить задачу</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;