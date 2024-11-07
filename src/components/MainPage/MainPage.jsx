import React from "react";
import './MainPage.css';
import nikitaImage from '../../img/nikita-image.jpg';
import igorImage from '../../img/igor-image.jpg';
import reactIcon from '../../img/react-icon.svg';

function MainPage(){
    return (
        <div className="main-page__container" id="main-page">
            <h2 className="main__title">Главная</h2>
            <div className="main-page__blocks-wrapper">
                <div className="blocks__description">
                    <p className="main__description">
                        Данное приложение создавалось с учебно-практической целью для дисциплины Основы механики
                    </p>
                    <p className="main__description">
                        В создании участвовали: <span className="main__span name-of-creator">Агапов Николай, Кувшинников Никита, Камушкин Игорь</span>
                    </p>
                    <p className="main__description">
                        Выбранный стек:
                        <span className="main__span choose-technology">
                            <img className="react-icon" src={reactIcon} alt="React Logo" />
                            React JS
                        </span>
                    </p>
                </div>
                <div className="blocks__image">
                    <img className="creator-image" src={nikitaImage} alt="Создатель: Никита"></img>
                    <img className="creator-image" src={igorImage} alt="Создатель: Игорь"></img>
                    <img className="creator-image" src={nikitaImage} alt="Создатель: Никита"></img>
                </div>
            </div>
        </div>
    );
}

export default MainPage;