"use client";
import { useEffect, useState } from "react";
import styles from "./animatedCurser.module.css"

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    

    const handleClick = (e) => {
        const id = Date.now();
        const newClick = {
          x: e.clientX,
          y: e.clientY,
          id,
        };
  
        setClicks((prev) => [...prev, newClick]);
  
        setTimeout(() => {
          setClicks((prev) => prev.filter((click) => click.id !== id));
        }, 500); 
      };
  
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("click", handleClick);
  
      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("click", handleClick);
      };
    }, []);
  return (
    <>
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        className={styles.animatedcursor}
      ></div>

      {clicks.map((click) => (
        <span
          key={click.id}
          className={styles.clickcircle}
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`,
          }}
        ></span>
      ))}
    </>
    
  );
}
