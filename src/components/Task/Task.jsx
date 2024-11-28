import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import './Task.css';
import ModalInfoTask from "../ModalInfoTask/ModalInfoTask";
import Arrow from '../../img/Arrow.svg';
import ModalSolution from "../ModalSolution/ModalSolution";
import ForceModal from "../ForceModal/ForceModal";

function Task({handleSolve, collectInputData, taskData}) {
    const [shapes, setShapes] = useState([]);
    const [isSupportModalOpen, setSupportModalOpen] = useState(false);
    const [supportPosition, setSupportPosition] = useState(null);
    const [forceDirection, setForceDirection] = useState(null);
    const [forcePosition, setForcePosition] = useState(null);
    const [isSelectingForce, setIsSelectingForce] = useState(false);
    const [isModalInfoOpen, setModalInfoOpen] = useState(false);
    const palleteRef = useRef(null);
    const [isSolutionModalOpen, setSolutionModalOpen] = useState(false);
    const [haveSolution, setHaveSolution] = useState(false);
    const [forceWait, setForceWait] = useState(false);
    const [forceModalopen, setForceModalOpen] = useState(false);
    const [arrows, setArrows] = useState({});
    const [selectedFigureId, setSelectedFigureId] = useState(null);


    const addSquare = () => {
        const sideLength = 100;
        const area = sideLength ** 2;
        const id = Date.now();
        setShapes([...shapes, { id, type: "square", sideLength, area }]);
    };

    const addRectangle = () => {
        const width = 120;
        const height = 60;
        const area = width * height;
        const id = Date.now();
        setShapes([...shapes, { id, type: "rectangle", width, height, area }]);
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

    const handleSolutionClick = () => {
        setSolutionModalOpen(true);
    }

    const handleCloseSolution = () => {
        setSolutionModalOpen(false);
    }

    const handleClickWaitForces = (id) => {
        if (forceWait) {
            setForceModalOpen(true);
            setSelectedFigureId(id);
        }
    };
    

    const handlePositionSelect = (position) => {
        console.log(`Сила размещена: ${position}`);
        setArrows((prevArrows) => ({
            ...prevArrows,
            [selectedFigureId]: [...(prevArrows[selectedFigureId] || []), position], // Добавляем новую стрелочку к выбранной фигуре
        }));
        setForceWait(false);
        setForceModalOpen(false);
    };

    const getArrowPositionStyle = (position) => {
        switch (position) {
            case 'left':
                return { left: '0', top: '52%', transform: 'translateY(-50%)' };
            case 'center':
                return { left: '50%', top: '45%', transform: 'translateX(-50%)' };
            case 'right':
                return { right: '-6.3rem', top: '52%', transform: 'translateY(-50%)' };
            default:
                return {};
        }
    };

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
                        <li className="figure__li" onClick={() => setForceWait(true)}>Поставить силу</li>
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
                                        className={`draggable__${shape.type} ${forceWait ? 'figure--wait' : ''}`}
                                        style={{
                                            width: shape.type === "square" ? shape.sideLength * 2 : shape.width * 2,
                                            height: shape.type === "square" ? shape.sideLength * 2 : shape.height * 2,
                                        }}
                                        onClick={() => handleClickWaitForces(shape.id)} // Передача id
                                    >
                                        {arrows[shape.id]?.map((position, index) => (
                                            <div
                                                key={index}
                                                className="arrow"
                                                style={{
                                                    position: 'absolute',
                                                    ...getArrowPositionStyle(position),
                                                }}
                                            >
                                                <img className='arrow-force-image' src={Arrow} alt="arrow" />
                                            </div>
                                        ))}
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
                {haveSolution && (
                    <button className="send__task" onClick={handleSolutionClick}></button>
                )}
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
                    openSolution = {() => {
                        setModalInfoOpen(false);
                        setSolutionModalOpen(true);
                        handleSolve();
                        setHaveSolution(true);
                    }}
                />
            )}

            {isSolutionModalOpen && (
                <ModalSolution data={taskData} onClose={handleCloseSolution} index={shapes.length - 1} />
            )}

            <ForceModal
                isOpen={forceModalopen}
                onClose={() => setForceModalOpen(false)}
                onSelectPosition={handlePositionSelect}
            />
        </div>
    );
}

export default Task;
