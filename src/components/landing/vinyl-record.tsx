"use client";

import { useState, useRef } from "react";

export function VinylRecord() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const s = 380;
  const grooveCount = 18;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotation({ x: -dy * 22, y: dx * 22 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: s,
          height: s,
          perspective: "900px",
          cursor: "none",
          userSelect: "none",
        }}
        className="relative flex items-center justify-center"
      >
        {/* Glow behind */}
        <div
          style={{
            position: "absolute",
            width: s * 0.85,
            height: s * 0.85,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(29,185,84,0.25) 0%, transparent 70%)",
            filter: "blur(36px)",
            transform: `rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)`,
            transition: isHovered ? "none" : "transform 0.6s ease",
            pointerEvents: "none",
          }}
        />

        {/* Vinyl disc */}
        <div
          style={{
            width: s,
            height: s,
            borderRadius: "50%",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isHovered
              ? "transform 0.08s ease-out"
              : "transform 0.6s ease",
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          <svg
            width={s}
            height={s}
            viewBox={`0 0 ${s} ${s}`}
            style={{
              display: "block",
              filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.9))",
            }}
          >
            <defs>
              <radialGradient id="vinylGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="40%" stopColor="#0d0d0d" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <radialGradient id="labelGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e8e8e8" />
              </radialGradient>
              <radialGradient id="greenCenter" cx="42%" cy="38%" r="60%">
                <stop offset="0%" stopColor="#1ed760" />
                <stop offset="100%" stopColor="#1DB954" />
              </radialGradient>
              <radialGradient id="sheen" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.13)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
              </radialGradient>
            </defs>

            {/* Outer disc */}
            <circle cx={s / 2} cy={s / 2} r={s / 2 - 2} fill="url(#vinylGrad)" />

            {/* Grooves */}
            {Array.from({ length: grooveCount }, (_, i) => {
              const maxR = s / 2 - 10;
              const minR = s * 0.175;
              const r = minR + (maxR - minR) * (i / (grooveCount - 1));
              const opacity = 0.07 + (i / grooveCount) * 0.06;
              return (
                <circle
                  key={i}
                  cx={s / 2}
                  cy={s / 2}
                  r={r}
                  fill="none"
                  stroke={`rgba(255,255,255,${opacity})`}
                  strokeWidth="0.7"
                />
              );
            })}

            {/* White label */}
            <circle cx={s / 2} cy={s / 2} r={s * 0.175} fill="url(#labelGrad)" />

            {/* Decorative rings on label */}
            <circle cx={s / 2} cy={s / 2} r={s * 0.155} fill="none" stroke="#ccc" strokeWidth="0.4" />
            <circle cx={s / 2} cy={s / 2} r={s * 0.1} fill="none" stroke="#ddd" strokeWidth="0.3" />

            {/* Red center dot */}
            <circle cx={s / 2} cy={s / 2} r={s * 0.065} fill="url(#greenCenter)" />

            {/* Spindle hole */}
            <circle cx={s / 2} cy={s / 2} r={s * 0.018} fill="#111" />

            {/* Sheen overlay */}
            <circle cx={s / 2} cy={s / 2} r={s / 2 - 2} fill="url(#sheen)" />
          </svg>
        </div>

        {/* Custom cursor dot */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1DB954",
              pointerEvents: "none",
              boxShadow: "0 0 10px 3px rgba(29,185,84,0.7)",
              transform: `translate(${(rotation.y / 22) * (s / 2) * 0.6}px, ${(-rotation.x / 22) * (s / 2) * 0.6}px)`,
              transition: "transform 0.08s ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
}
