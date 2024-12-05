import React, { useState } from 'react';
import './ForceModal.css';

function ForceModal({ isOpen, onClose, onSelectPosition, onSelectDirection }) {
    const [secondQuestion, setSecondQuestion] = useState(false);
    if (!isOpen) return null;

    const handlePositionSelect = (position) => {
        onSelectPosition(position);
        setSecondQuestion(true);
    };

    const handleDirectionSelect = (direction) => {
        onSelectDirection(direction);
        onClose();
        setSecondQuestion(false);
    };

    return (
        <div className="force-modal">
            <div className="force-modal__overlay" onClick={onClose}></div>
            <div className="force-modal__content">
                <h2 className="force-modal__title">{secondQuestion ? 'Выберите направление силы' : 'Выберите размещение силы'}</h2>
                <div className="force-modal__options">
                {!secondQuestion && (
                    <>
                        <button className="force-modal__option" onClick={() => handlePositionSelect('left')}>Слева</button>
                        <button className="force-modal__option" onClick={() => handlePositionSelect('center')}>По центру</button>
                        <button className="force-modal__option" onClick={() => handlePositionSelect('right')}>Справа</button>
                    </>
                )}
                {secondQuestion && (
                    <>  
                        <button className='force-modal__option' onClick={() => handleDirectionSelect('dir-left')}>Слева</button>
                        <button className='force-modal__option' onClick={() => handleDirectionSelect('dir-right')}>Справа</button>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}

export default ForceModal;
