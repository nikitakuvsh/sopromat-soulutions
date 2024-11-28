import React from 'react';
import './ForceModal.css';

function ForceModal({ isOpen, onClose, onSelectPosition }) {
    if (!isOpen) return null;

    const handlePositionSelect = (position) => {
        onSelectPosition(position);
        onClose();
    };

    return (
        <div className="force-modal">
            <div className="force-modal__overlay" onClick={onClose}></div>
            <div className="force-modal__content">
                <h2 className="force-modal__title">Выберите размещение силы</h2>
                <div className="force-modal__options">
                    <button
                        className="force-modal__option"
                        onClick={() => handlePositionSelect('left')}
                    >
                        Слева
                    </button>
                    <button
                        className="force-modal__option"
                        onClick={() => handlePositionSelect('center')}
                    >
                        По центру
                    </button>
                    <button
                        className="force-modal__option"
                        onClick={() => handlePositionSelect('right')}
                    >
                        Справа
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForceModal;
