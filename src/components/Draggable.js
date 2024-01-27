import React from 'react';

const Draggable = ({ id, children, onClick }) => {
    const dragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);
    };

    const dragOver = (e) => {
        e.stopPropagation();
    };

    return (
        <div id={id} draggable='true' onDragStart={dragStart} onDragOver={dragOver} onClick={onClick}>
            {children}
        </div>
    );
};

export default Draggable;