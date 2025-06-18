import { weatherMain } from "@/pages/HomePage/utils/utils";
import { useEffect, useRef, useState } from "react";

const Loading = () => {
  const val = Math.floor(Math.random() * 100) % Object.keys(weatherMain).length;
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const [link, setLink] = useState(weatherMain[Object.keys(weatherMain)[val]]);
  useEffect(() => {
    ref.current = setInterval(() => {
      const val =
        Math.floor(Math.random() * 100) % Object.keys(weatherMain).length;
      setLink(weatherMain[Object.keys(weatherMain)[val]]);
    }, 2000);
    return () => {
      clearInterval(ref.current as ReturnType<typeof setInterval>);
    };
  }, []);
  
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <img
        src={link ? link : undefined}
        alt="loading-icon"
        className="w-[50px] loading-img"
      />
    </div>
  );
};

export default Loading;
