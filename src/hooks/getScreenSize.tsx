import { useState, useEffect, useMemo } from "react";

type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getBreakpoint = useMemo(() => {
    const breakpoints: Breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    };

    for (const breakpoint in breakpoints) {
      if (Object.prototype.hasOwnProperty.call(breakpoints, breakpoint)) {
        const bp: keyof Breakpoints = breakpoint as keyof Breakpoints;
        if (screenSize >= breakpoints[bp]) {
          return bp;
        }
      }
    }

    return "xs";
  }, [screenSize]);

  return {
    screenSize,
    breakpoint: getBreakpoint,
  };
};

export default useScreenSize;
