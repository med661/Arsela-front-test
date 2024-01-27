import React from 'react';

import Draggable from './Draggable';
import { AiTwotoneMail, AiFillAliwangwang, AiFillAmazonCircle, AiFillAmazonSquare } from "react-icons/ai";
const Sidebar = () => {

    const icons = [
        { name: 'AiTwotoneMail', icon: AiTwotoneMail, color: 'yellow' },
        { name: 'AiFillAliwangwang', icon: AiFillAliwangwang, color: 'blue' },
        { name: 'AiFillAmazonCircle', icon: AiFillAmazonCircle, color: 'green' },
        { name: 'AiFillAmazonSquare', icon: AiFillAmazonSquare, color: 'red' }
    ];

    return (
        <div style={{ width: '200px', height: '100vh', borderRight: '1px solid black' }}>
            {icons.map((icon, index) => (
                <Draggable style={{ border: '1px solid black' }} key={index} id={`draggable-${icon.name}`}>
                    <icon.icon size={100} color={icon.color} />
                </Draggable>
            ))}
        </div>
    );
};

export default Sidebar;