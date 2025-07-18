import { useEffect, useState } from "react";

// useWindow(768)
const useWindow = (size) => {
  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(size || 768);
  useEffect(() => {
    function viewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      );
      setWindowSize(width);
    }
    viewport();
    window.onresize = viewport;
  }, []);

  return windowSize;
};

export default useWindow;
