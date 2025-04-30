import React, { useEffect } from "react";

const useBodyScrollLock = (shouldLock) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [shouldLock]);
};

export default useBodyScrollLock;
