import { useState, useRef, MouseEvent } from 'react';
import './InteractiveName.css';


interface InteractiveNameProbs {
  name: string;
}


export default function InteractiveName({name} : InteractiveNameProbs) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const maskStyle = isHovering
    ? {
        maskImage: `radial-gradient(circle 60px at ${position.x}px ${position.y}px, transparent 20%, black 50%)`,
        WebkitMaskImage: `radial-gradient(circle 60px at ${position.x}px ${position.y}px, transparent 20%, black 50%)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      className="logo-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="logo-text logo-layer-bottom">{name}</span>
      <span className="logo-text logo-layer-top" style={maskStyle}>{name}</span>
    </div>
  );
}