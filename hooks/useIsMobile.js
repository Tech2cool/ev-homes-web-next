import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 616) => {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreen(); 
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
};
