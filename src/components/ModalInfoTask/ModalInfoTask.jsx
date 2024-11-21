import React from "react";
import "./ModalInfoTask.css";

function ModalInfoTask({ shapes, onClose }) {
    return (
        <div className="modal-info-task">
            <div className="modal-info-task__content">
                <h3 className="modal-info-task__title">Введите значения переменных</h3>
                <div className="modal-info-task__input-wrapper">
                    <label className="modal-info-task__label">
                        E:
                        <input
                            className="modal-info-task__input"
                            type="number"
                            placeholder="Введите значение"
                        />
                        МПа
                    </label>
                </div>
                <ul className="modal-info-task__list">
                    {shapes.map((shape, index) => (
                        <li className="modal-info-task__list-item" key={index}>
                            {shape.type === "square" && (
                                <>
                                    A{index}: 
                                    <input
                                        className="modal-info-task__input"
                                        type="number"
                                        placeholder="Введите значение"
                                    /> мм²
                                </>
                            )}
                            {shape.type === "rectangle" && (
                                <>
                                    A{index}:
                                    <input
                                        className="modal-info-task__input"
                                        type="number"
                                        placeholder="Введите значение"
                                    /> мм²
                                </>
                            )}
                            {shape.type === "force" && (
                                <>
                                    Сила F{index}: Направление {shape.direction}
                                    <input
                                        className="modal-info-task__input"
                                        type="number"
                                        placeholder="Введите значение"
                                    />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <button className="modal-info-task__button make--solution">Решить</button>
                <button className="modal-info-task__button do--close" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default ModalInfoTask;
