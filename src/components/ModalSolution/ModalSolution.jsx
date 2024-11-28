import React from "react";
import "./ModalSolution.css";

function ModalSolution({ data, onClose }) {
    // Преобразуем массив данных в объект с ключами из `name` и значениями из `value`
    const variables = data.reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
    }, {});

    // Деструктурируем переменные из объекта
    const { E, A1, l1, A2, l2, A3, l3, A4, l4, A5, l5, F } = variables; // Добавьте сюда имена всех возможных переменных

    return (
        <div className="modal-solution">
            <div className="modal-solution__content">
                <h3 className="modal-solution__title">Решение задачи</h3>
                <div className="modal-solution__body">
                    {/* Выводим переменные */}
                    <p>E: {E || "Не указано"}</p>
                    <p>A1: {A1 || "Не указано"}</p>
                    <p>l1: {l1 || "Не указано"}</p>
                    <p>F: {F || "Не указано"}</p>
                    {/* Можно вывести и другие переменные по мере необходимости */}
                </div>
                <button className="modal-solution__button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default ModalSolution;
