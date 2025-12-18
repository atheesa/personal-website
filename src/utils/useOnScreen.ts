import { useEffect, useState, useRef } from "react";

export function useOnScreen() {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) observer.unobserve(ref.current); 
      }
    }, {threshold : 0.5, rootMargin: "0px 0px 0px 0px"});

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); 

  return { ref, isIntersecting };
}