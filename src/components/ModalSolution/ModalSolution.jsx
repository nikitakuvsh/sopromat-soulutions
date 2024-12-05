import React from "react";
import "./ModalSolution.css";
import { useState } from "react";

function ModalSolution({ data, onClose, index }) {
    const eValue = data.find(item => item.name === "E")?.value || 0;
    const variables = Array.from({ length: index }, (_, i) => ({
        [`A${i + 1}`]: data.find(item => item.name === `A${i + 1}`)?.value || 0,
        [`l${i + 1}`]: data.find(item => item.name === `l${i + 1}`)?.value || 0,
    }));
    const [visibleSolutionButton, setVisibleSolutionButton] = useState(false);
    
    return (
        <div className="modal-solution">
            <div className="modal-solution__content">
                <h3 className="modal-solution__title">Решение задачи</h3>
                <div className="modal-solution__body">
                    {/* <p>index = {index}</p>
                    <p>{`E`} = {eValue}</p>
                    {variables.map((vars, idx) => (
                        <div key={idx}>
                            <p>{`A${idx + 1}`} = {vars[`A${idx + 1}`]}</p>
                            <p>{`l${idx + 1}`} = {vars[`l${idx + 1}`]}</p>
                        </div>
                    ))} */}
                    <div className="modal-solution__calc-block">
                        <p className="modal-solution__task-title">1) Продольные силы</p>
                        <p className="modal-solution__task-calc">N<span className="modal-solution__task-calc--index">1</span> = -F</p>
                        <p className="modal-solution__task-calc">N<span className="modal-solution__task-calc--index">2</span> = -F</p>
                        <p className="modal-solution__task-calc">N<span className="modal-solution__task-calc--index">3</span> = -F + 2F</p>
                        <p className="modal-solution__task-calc">N<span className="modal-solution__task-calc--index">4</span> = F - 2F = -F</p>
                    </div>
                </div>
                <button className="modal-solution__button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default ModalSolution;
