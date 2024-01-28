import React, { useEffect, useState } from "react";
import { getPagesAsync } from "../../features/page";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import PageItem from "./pageIthem";
import Droppable from "../Droppable";

const PageList = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [startIcon, setStartIcon] = useState(null);
  const [endIcon, setEndIcon] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const dispatch = useDispatch();
  const pages = useSelector((state) => state.page.pages);

  useEffect(() => {
    dispatch(getPagesAsync());
  }, [dispatch]);

  if (!pages) {
    return <div>Loading...</div>;
  }

  const handlePageSelect = (pageName, id) => {
    setSelectedPage(pageName);
    setSelectedId(id);
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

  // Render page list
  const renderPageList = () => {
    return pages.map((page) => (
      <div
        key={page.id}
        onClick={() => handlePageSelect(page.name, page.id)}
        style={{
          color: selectedPage === page.name ? "red" : "black",
          padding: "10px",
          cursor: "pointer",
          backgroundColor:
            selectedPage === page.name ? "#f5f5f5" : "transparent",
          borderLeft: selectedPage === page.name ? "3px solid #007bff" : "none",
          height: "30px",
        }}
      >
        {page.name}{" "}
        <button
          style={{ color: "orange" }}
          onClick={() => console.log("delete page")}
        >
          x
        </button>
      </div>
    ));
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          height: "100vh",
        }}
      >
        <h1>Page List</h1>
        {renderPageList()}
        <button>ADD NEW PAGE</button>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>icons</h1>
        <Sidebar />
        {selectedPage && (
          <div>
            <h2>{selectedPage}</h2>
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Page {selectedPage}</h1>
        {selectedPage && (
          <div>
            <Droppable onDrop={handleDrop} style={{ flex: 1 }}>
              {selectedId}
            </Droppable>

            <PageItem id={selectedId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageList;
