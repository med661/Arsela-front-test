import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Droppable from './components/Droppable';
import Line from './components/Line';
import PageList from './components/pages';

const App = () => {
  const [startIcon, setStartIcon] = useState(null);
  const [endIcon, setEndIcon] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const handleIconClick = (e) => {
    const icon = e.target.getBoundingClientRect();
    const position = { x: icon.x, y: icon.y, id: e.target.id };

    if (!startIcon) {
      setStartIcon(position);
    } else if (!endIcon) {
      setEndIcon(position);
    } else {
      setStartIcon(position);
      setEndIcon(null);
    }
  };

  const handleDrop = (e) => {
    const dropPoint = e.target.getBoundingClientRect();
    const position = { x: dropPoint.x, y: dropPoint.y };

    if (!startPoint) {
      setStartPoint(position);
    } else {
      setEndPoint(position);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {  /*    <Sidebar />
      <Droppable onDrop={handleDrop} style={{ flex: 1 }}>
        <h1>Drop items here</h1>
        {startPoint && endPoint && <Line start={startPoint} end={endPoint} />}
      </Droppable>*/}
      <PageList></PageList>
    </div>
  );
};

export default App;