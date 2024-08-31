import React, { useState, useEffect } from "react";

function useResponsiveContent() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [breakpoints, setBreakpoints] = useState({
    isMobile: window.innerWidth < 767,
    isTablet: window.innerWidth >= 767 && window.innerWidth < 991,
    isDesktop: window.innerWidth >= 991,
  });
  useEffect(() => {
    setBreakpoints({
      isMobile: screenSize < 767,
      isTablet: screenSize > 767 && screenSize < 991,
      isDesktop: screenSize > 991,
    });
  }, [screenSize]);
  useEffect(() => {
    const handleSizeChange = () => setScreenSize(window.innerWidth);
    handleSizeChange();
    document.addEventListener("resize", handleSizeChange);
    return document.removeEventListener("resize", handleSizeChange);
  }, []);

  return breakpoints
}

export default useResponsiveContent;
