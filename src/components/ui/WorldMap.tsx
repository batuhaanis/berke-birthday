"use client";

import { useMemo, useState } from "react";
import DottedMap from "dotted-map";
import { motion, AnimatePresence } from "framer-motion";
import { cities } from "@/lib/mapData";

interface WorldMapProps {
  selectedCityId: string | null;
  onCitySelect: (cityId: string) => void;
  showResult: boolean;
}

export function WorldMap({
  selectedCityId,
  onCitySelect,
  showResult,
}: WorldMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const map = useMemo(() => {
    const m = new DottedMap({ height: 60, grid: "diagonal" });
    cities.forEach((city) => {
      m.addPin({
        lat: city.lat,
        lng: city.lng,
        svgOptions: {
          color: selectedCityId === city.id ? "#c4825a" : "#b0a89e",
          radius: selectedCityId === city.id ? 0.55 : 0.35,
        },
      });
    });
    return m;
  }, [selectedCityId]);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        shape: "circle",
        radius: 0.18,
        color: "#d5cfc7",
        backgroundColor: "#faf8f5",
      }),
    [map]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-border">
      <div className="relative w-full aspect-[2/1]">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="absolute inset-0 w-full h-full object-cover"
          alt="harita"
          draggable={false}
        />

        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="pin-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {cities.map((city) => {
            const p = projectPoint(city.lat, city.lng);
            const isSelected = selectedCityId === city.id;
            const isHovered = hoveredCity === city.id;
            const isWrong = showResult && isSelected && !city.isCorrect;

            return (
              <g key={city.id}>
                {/* pulse ring */}
                {isSelected && !showResult && (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    fill="none"
                    stroke="#c4825a"
                    strokeWidth="1"
                    initial={{ r: 4, opacity: 0.6 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* pin */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 5.5 : isHovered ? 4.5 : 3}
                  fill={isWrong ? "#b07070" : isSelected ? "#c4825a" : isHovered ? "#a86b44" : "#8a8279"}
                  filter={isSelected ? "url(#pin-glow)" : undefined}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => !showResult && onCitySelect(city.id)}
                />

                {/* label */}
                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.foreignObject
                      x={p.x - 55}
                      y={p.y - 42}
                      width="110"
                      height="30"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none"
                    >
                      <div className="flex items-center justify-center h-full">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium ${
                            isSelected
                              ? "bg-accent/15 text-accent"
                              : "bg-card text-foreground border border-border"
                          }`}
                        >
                          {city.name}
                        </span>
                      </div>
                    </motion.foreignObject>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
