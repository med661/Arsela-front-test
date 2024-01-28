import React, { useState, useEffect } from 'react';
import Draggable from './Draggable'; // Adjust the import path as needed
import { AiTwotoneMail, AiFillAliwangwang, AiFillAmazonCircle, AiFillAmazonSquare } from "react-icons/ai";

function Droppable({ children }) {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/draggable-item/getByPageId/${children}`)
            .then(response => response.json())
            .then(data => {
                const transformedData = data.map((item) => ({
                    ...item,
                    name: item.name,
                    x: item.position.x,
                    y: item.position.y,
                }));
                setItemData(transformedData);
                setLoading(false);
                console.log({ transformedData });
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [children]);
    const drop = (e) => {
        e.preventDefault();

        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        if (card) {
            card.style.display = 'block';

            const newItem = card.cloneNode(true);
            newItem.id = `item-${Date.now()}`;

            const droppableContainer = document.getElementById('droppable-container');

            const droppableBounds = droppableContainer.getBoundingClientRect();

            const left = e.clientX - droppableBounds.left;
            const top = e.clientY - droppableBounds.top;
            newItem.style.position = 'absolute';
            newItem.style.left = `${left}px`;
            newItem.style.top = `${top}px`;

            droppableContainer.appendChild(newItem);

            setItemData(prevData => [
                ...prevData,
                {
                    id: newItem.id,
                    name: newItem.innerText,
                    x: left,
                    y: top,
                    format: newItem.style,
                    width: newItem.offsetWidth,
                    height: newItem.offsetHeight,
                    page: children,
                },
            ]);

            console.log('Dropped item position:', { left, top });
        } else {
            console.warn(`Element with ID ${card_id} not found.`);
        }
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const icons = [
        { name: 'mail', icon: AiTwotoneMail, color: 'yellow' },
        { name: 'AiFillAliwangwang', icon: AiFillAliwangwang, color: 'blue' },
        { name: 'AiFillAmazonCircle', icon: AiFillAmazonCircle, color: 'green' },
        { name: 'AiFillAmazonSquare', icon: AiFillAmazonSquare, color: 'red' }
    ];

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div
                id="droppable-container"
                onDrop={drop}
                onDragOver={dragOver}
                style={{ position: 'relative', border: '1px solid black', width: '1500px', height: '100vh' }}
            >
                {itemData.map((item) => (
                    <Draggable key={item.id} position={{ x: item.x, y: item.y }}>
                        {icons.map((icon) => {
                            if (icon.name === item.name) {
                                const IconComponent = icon.icon;
                                return <IconComponent key={icon.name} style={{ color: icon.color }} />;
                            }
                            return null;
                        })}
                        <div>{item.name}</div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
}

export default Droppable;