import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const Droppable = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [itemData, setItemData] = useState(null);

    console.log({ children });
    useEffect(() => {
        if (itemId) {
            // Make an API call to search for the item in the database using the itemId
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
            fetch(`YOUR_API_ENDPOINT?id=${itemId}`)
                .then(response => response.json())
                .then(data => setItemData(data))
                .catch(error => console.error(error));
        }
    }, [itemId]);

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
        console.log({ card_copy });

        card_copy.onclick = () => setModalIsOpen(true);
        setItemId(card_copy.id);
        
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div onDrop={drop} onDragOver={dragOver} style={{ position: 'relative', border: '1px solid black', width: "1500px", height: "100vh" }} >
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button onClick={() => setModalIsOpen(false)}>close</button>
                <div>I am a modal</div>
                {itemData && (
                    <div>
                        <h3>Item Details</h3>
                        <p>ID: {itemData.id}</p>
                        <p>Name: {itemData.name}</p>
                        {/* Display other item details as needed */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Droppable;
