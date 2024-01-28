import React from 'react';
import Draggable from './Draggable';
import { AiTwotoneMail, AiFillAliwangwang, AiFillAmazonCircle, AiFillAmazonSquare } from "react-icons/ai";

const Sidebar = () => {
    const icons = [
        { name: 'mail', icon: AiTwotoneMail, color: 'yellow' },
        { name: 'AiFillAliwangwang', icon: AiFillAliwangwang, color: 'blue' },
        { name: 'AiFillAmazonCircle', icon: AiFillAmazonCircle, color: 'green' },
        { name: 'AiFillAmazonSquare', icon: AiFillAmazonSquare, color: 'red' }
    ];

    return (
        <div style={{ width: '200px', height: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
            {icons.map(({ name, icon: Icon, color }, index) => (
                <Draggable style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index} id={`draggable-${name}`}>
                    <Icon size={100} color={color} style={{ marginBottom: '10px' }} />

                    <span style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>{name}</span>

                </Draggable>
            ))}
        </div>
    );
};

export default Sidebar;