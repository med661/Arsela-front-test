const Line = ({ start, end }) => {
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const xMid = (start.x + end.x) / 2;
    const yMid = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

    return (
        <div
            style={{
                height: '1px',
                width: `${distance}px`,
                backgroundColor: 'black',
                position: 'absolute',
                transform: `translate(${xMid}px, ${yMid}px) rotate(${angle}deg)`,
                transformOrigin: '0 0',
            }}
        />
    );
};
export default Line;