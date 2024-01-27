import React, { useState } from 'react';

const Droppable = ({ children }) => {
  


    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);
        card.style.display = 'block';

        // Create a copy of the card instead of moving it
        const card_copy = card.cloneNode(true);
        card_copy.id = Date.now(); // Give the copy a unique id

        // Get the bounds of the droppable area
        const droppableBounds = e.target.getBoundingClientRect();

        // Set the position of the card copy to the cursor position relative to the droppable area
        card_copy.style.position = 'absolute';
        card_copy.style.left = `${e.clientX - droppableBounds.left}px`;
        card_copy.style.top = `${e.clientY - droppableBounds.top}px`;

        e.target.appendChild(card_copy);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

 
    return (
        <div onDrop={drop} onDragOver={dragOver} style={{ position: 'relative' }} >
            {children}
        </div>
    );
};

export default Droppable;

