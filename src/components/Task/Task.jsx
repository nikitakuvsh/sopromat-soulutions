import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import './Task.css';
import ModalInfoTask from "../ModalInfoTask/ModalInfoTask";
import Arrow from '../../img/Arrow.svg';

function Task() {
    const [shapes, setShapes] = useState([]);
    const [isSupportModalOpen, setSupportModalOpen] = useState(false);
    const [supportPosition, setSupportPosition] = useState(null);
    const [forceDirection, setForceDirection] = useState(null);
    const [forcePosition, setForcePosition] = useState(null);
    const [isSelectingForce, setIsSelectingForce] = useState(false);
    const [isModalInfoOpen, setModalInfoOpen] = useState(false);
    const palleteRef = useRef(null);

    const addSquare = () => {
        const sideLength = 100;
        const area = sideLength ** 2;
        setShapes([...shapes, { type: "square", sideLength, area }]);
    };

    const addRectangle = () => {
        const width = 120;
        const height = 60;
        const area = width * height;
        setShapes([...shapes, { type: "rectangle", width, height, area }]);
    };

    const addSupport = (position) => {
        setShapes([{ type: "support", position }, ...shapes]);
        setSupportPosition(position);
        setSupportModalOpen(false);
    };

    const openSupportModal = () => {
        setSupportModalOpen(true);
    };

    const handlePalleteClick = (e) => {
        if (isSelectingForce) {
            const rect = palleteRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = (e.clientY - rect.top) / 2;
            setForcePosition({ left: x, top: y });
            setIsSelectingForce(false);
        }
    };

    const handleCalculateClick = () => {
        setModalInfoOpen(true);
    }

    return (
        <div className="task__container">
            <div className="task__text-container">
                <h2 className="main__title">Решить задачу</h2>
                <h3 className="main__type-of-task">Растяжение-сжатие</h3>
            </div>
            <div className="task__pallete" ref={palleteRef} onClick={handlePalleteClick}>
                <div className="choose__figure">
                    <ul className="figure__ul">
                        <li className="figure__li" onClick={addSquare}>Квадрат</li>
                        <li className="figure__li" onClick={addRectangle}>Прямоугольник</li>
                        <li className="figure__li" onClick={openSupportModal}>Опора</li>
                        <li className="figure__li" onClick={() => setIsSelectingForce(true)}>Поставить силу</li>
                    </ul>
                </div>

                <Draggable bounds="parent">
                    <div className="draggable__group">
                        {shapes.map((shape, index) => (
                            <div key={index}>
                                {shape.type === "support" ? (
                                    <div
                                        className={`support ${shape.position === "left" ? "support--left" : "support--right"}`}
                                    >
                                        <div className="support__label">Опора ({shape.position === "left" ? "Слева" : "Справа"})</div>
                                        <div className="support-line"></div>
                                    </div>
                                ) : shape.type === "square" || shape.type === "rectangle" ? (
                                    <div
                                        className={`draggable__${shape.type}`}
                                        style={{
                                            width: shape.type === "square" ? shape.sideLength * 2 : shape.width * 2,
                                            height: shape.type === "square" ? shape.sideLength * 2 : shape.height * 2,
                                        }}
                                    >
                                        <div className={`${shape.type}__label`}>Площадь: A{index} cм²</div>
                                        <div className="axis-line axis-line--horizontal" />
                                        {/* Линии вниз от двух углов фигуры */}
                                        {shape.type === "square" ? (
                                            <>
                                            <div
                                                className="section-line"
                                                style={{
                                                    height: "75%", // Линия для квадрата
                                                }}
                                            />
                                            <div className="section-line__arrow-text" style={{bottom: '-70%'}}>
                                                <span className="length__span"><span className="length__span--ff">l</span>{index} м</span>
                                            </div>
                                            <div className="section-line__arrow" style={{
                                                bottom: '-78%',
                                            }}>
                                                <img className="arrow-image" src={Arrow} style={{
                                                    width: '6.3rem',
                                                    transform: 'rotate(180deg)',
                                                }}></img>
                                                <img className="arrow-image" src={Arrow} style={{
                                                    width: '6.3rem',
                                                }}></img>
                                            </div>
                                            </>
                                        ) : (
                                            <>
                                            <div
                                                className="section-line"
                                                style={{
                                                    height: "160%", // Увеличенная линия для прямоугольника
                                                }}
                                            />
                                            <div className="section-line__arrow-text" style={{bottom: '-150%'}}>
                                                <span className="length__span"><span className="length__span--ff">l</span>{index} м</span>
                                            </div>
                                            <div className="section-line__arrow" style={{
                                                bottom: '-165%',
                                            }}>
                                                <img className="arrow-image" src={Arrow} style={{
                                                    width: '7.5rem',
                                                    transform: 'rotate(180deg)',
                                                }}></img>
                                                <img className="arrow-image" src={Arrow} style={{
                                                    width: '7.5rem',
                                                }}></img>
                                            </div>
                                            </>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </Draggable>
                <button className="send__task" onClick={handleCalculateClick}>Рассчитать</button>
            </div>

            {isSupportModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <h3>Выберите сторону для опоры</h3>
                        <button onClick={() => addSupport("left")}>Слева</button>
                        <button onClick={() => addSupport("right")}>Справа</button>
                        <button onClick={() => setSupportModalOpen(false)}>Отмена</button>
                    </div>
                </div>
            )}

            {isModalInfoOpen && (
                <ModalInfoTask
                    shapes={shapes}
                    onClose={() => setModalInfoOpen(false)}
                />
            )}
        </div>
    );
}

export default Task;
