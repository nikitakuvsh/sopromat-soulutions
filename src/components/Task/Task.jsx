import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import './Task.css';
import ModalInfoTask from "../ModalInfoTask/ModalInfoTask";

function Task() {
    const [shapes, setShapes] = useState([]);
    const [isSupportModalOpen, setSupportModalOpen] = useState(false);
    const [isForceModalOpen, setForceModalOpen] = useState(false);
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

    const openForceModal = (position) => {
        setForcePosition(position);
        setIsSelectingForce(true);
    };

    const handlePalleteClick = (e) => {
        if (isSelectingForce) {
            const rect = palleteRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = (e.clientY - rect.top) / 2;
            setForcePosition({ left: x, top: y });
            setForceModalOpen(true);
            setIsSelectingForce(false);
        }
    };

    const addForce = () => {
        if (forceDirection) {
            setShapes([
                ...shapes,
                { type: "force", direction: forceDirection, position: forcePosition }
            ]);
            setForceModalOpen(false);
        }
    };

    const handleDrag = (e, data) => {
        const paletteBounds = palleteRef.current.getBoundingClientRect();
        const itemBounds = data.node.getBoundingClientRect();

        if (itemBounds.left < paletteBounds.left) {
            data.x = paletteBounds.left - paletteBounds.left;
        }
        if (itemBounds.top < paletteBounds.top) {
            data.y = paletteBounds.top - paletteBounds.top;
        }
        if (itemBounds.right > paletteBounds.right) {
            data.x = paletteBounds.right - itemBounds.width;
        }
        if (itemBounds.bottom > paletteBounds.bottom) {
            data.y = paletteBounds.bottom - itemBounds.height;
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

                <Draggable onDrag={handleDrag} bounds="parent">
                    <div className="draggable__group">
                        {shapes.map((shape, index) => (
                            shape.type === "support" ? (
                                <div
                                    key={index}
                                    className={`support ${shape.position === "left" ? "support--left" : "support--right"}`}
                                >
                                    <div className="support__label">Опора ({shape.position === "left" ? "Слева" : "Справа"})</div>
                                </div>
                            ) : shape.type === "square" ? (
                                <div key={index} className="draggable__square" style={{ width: shape.sideLength * 2, height: shape.sideLength * 2 }}>
                                    <div className="square__label">Площадь: A{index + 1} мм²</div>
                                </div>
                            ) : shape.type === "rectangle" ? (
                                <div key={index} className="draggable__rectangle" style={{ width: shape.width * 2, height: shape.height * 2 }}>
                                    <div className="rectangle__label">Площадь: A{index + 1} мм²</div>
                                </div>
                            ) : shape.type === "force" ? (
                                <div key={index} className="force" style={{ position: "absolute", left: shape.position.left, top: shape.position.top }}>
                                    <div className="force__label">F{index + 1}</div>
                                    <div
                                        className={`force__arrow ${shape.direction}`}
                                        style={{
                                            position: 'absolute',

                                            left: '-930%',
                                            transform: `translate(-50%, -50%) ${shape.direction === 'left' ? 'rotate(180deg)' : ''}`,
                                            width: '100px',  // Длина стрелки
                                            height: '5px',   // Толщина стрелки
                                            backgroundColor: 'black',
                                            borderRadius: '3px',
                                        }}
                                    >
                                        <div
                                            className="force__arrow-head"
                                            style={{
                                                position: 'absolute',
                                                top: '-0.1rem',  // Позиция наконечника
                                                width: '1px',
                                                height: '0',
                                                borderLeft: '5px solid transparent',
                                                borderRight: '5px solid transparent',
                                                borderTop: '10px solid black',  // Наконечник стрелки
                                                left: shape.direction === 'right' ? '100%' : 'auto',
                                                right: shape.direction === 'left' ? '-10%' : 'auto',
                                                rotate: shape.direction === 'left' ? '-95deg' : 'auto',
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null
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

            {isForceModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <h3>Выберите направление силы</h3>
                        <button onClick={() => { setForceDirection("left"); addForce(); }}>Влево</button>
                        <button onClick={() => { setForceDirection("right"); addForce(); }}>Вправо</button>
                        <button onClick={() => setForceModalOpen(false)}>Отмена</button>
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
