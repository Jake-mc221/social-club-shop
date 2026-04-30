'use client';

import { useEffect, useState } from "react";

const FRAMES = ["⠀⠶⠀","⠰⣿⠆","⢾⣉⡷","⣏⠀⣹","⡁⠀⢈"];
const INTERVAL = 180;

interface PulseSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function PulseSpinner({ size = 24, color = "#fff", className }: PulseSpinnerProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((i) => (i + 1) % FRAMES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <span style={{ fontSize: size, color, lineHeight: `${size * 1.3}px` }}>
        {FRAMES[frame]}
      </span>
    </div>
  );
}
