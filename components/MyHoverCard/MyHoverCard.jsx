import React from "react";
import "./MyHoverCard.css";

const MyHoverCard = ({ title = "", onTap = () => {} }) => {
  return (
    <button className="Btn" onClick={() => onTap()}>
      {title} ❌
    </button>
  );
  return (
    <div className="cards">
      <div className="card red">
        <p className="tip">{title}</p>
        <div style={{ position: "absolute", right: 10, fontSize: 10.5 }}>x</div>
      </div>
    </div>
  );
};

export default MyHoverCard;
