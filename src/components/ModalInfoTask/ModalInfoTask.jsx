import React from "react";
import "./ModalInfoTask.css";

function ModalInfoTask({ shapes, onClose }) {
    return (
        <div className="modal-info-task">
            <div className="modal-info-task__content">
                <h3 className="modal-info-task__title">Введите значения переменных</h3>
                <ul className="modal-info-task__list">
                    <div className="modal-info-task__list-container">
                <label className="modal-info-task__label">
                        E:
                        <input
                            className="modal-info-task__input"
                            type="number"
                            placeholder="Введите значение"
                        />
                        МПа
                    </label>
                    {shapes.map((shape, index) => (
                        <li className="modal-info-task__list-item" key={index}>
                            {shape.type === "square" && (
                                <div className="modal-info-task__input-item">
                                    <label className="modal-info-task__label">
                                        A{index}:
                                        <input
                                            className="modal-info-task__input"
                                            type="number"
                                            placeholder="Введите значение площади"
                                        />
                                        мм²
                                    </label>
                                    <label className="modal-info-task__label">
                                        l{index}:
                                        <input
                                            className="modal-info-task__input"
                                            type="number"
                                            placeholder="Введите значение длины"
                                        />
                                        м
                                    </label>
                                </div>
                            )}
                            {shape.type === "rectangle" && (
                                <div className="modal-info-task__input-item">
                                    <label className="modal-info-task__label">
                                        A{index}:
                                        <input
                                            className="modal-info-task__input"
                                            type="number"
                                            placeholder="Введите значение площади"
                                        />
                                        мм²
                                    </label>
                                    <label className="modal-info-task__label">
                                        l{index}:
                                        <input
                                            className="modal-info-task__input"
                                            type="number"
                                            placeholder="Введите значение длины"
                                        />
                                        м
                                    </label>
                                </div>
                            )}
                            {shape.type === "force" && (
                                <div className="modal-info-task__input-item">
                                    <label className="modal-info-task__label">
                                        Сила F{index}: Направление {shape.direction}
                                        <input
                                            className="modal-info-task__input"
                                            type="number"
                                            placeholder="Введите значение силы"
                                        />
                                    </label>
                                </div>
                            )}
                        </li>
                    ))}
                    </div>
                </ul>
                <button className="modal-info-task__button make--solution">Решить</button>
                <button className="modal-info-task__button do--close" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default ModalInfoTask;
