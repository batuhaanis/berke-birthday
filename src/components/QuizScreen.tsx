"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cities, correctCityId } from "@/lib/mapData";

interface QuizScreenProps {
  onCorrect: () => void;
}

// rastgele kaçış yönü
function getEscapeDirection() {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * 300,
    y: Math.sin(angle) * 200,
    rotate: (Math.random() - 0.5) * 40,
  };
}

export function QuizScreen({ onCorrect }: QuizScreenProps) {
  const [escapedCities, setEscapedCities] = useState<Set<string>>(new Set());
  const [wrongClick, setWrongClick] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleHover = useCallback(
    (cityId: string) => {
      if (cityId === correctCityId) return;
      if (escapedCities.has(cityId)) return;
      setEscapedCities((prev) => new Set([...prev, cityId]));
    },
    [escapedCities]
  );

  const handleClick = useCallback(
    (cityId: string) => {
      if (cityId === correctCityId) {
        setShowCorrect(true);
        setTimeout(() => onCorrect(), 1500);
      } else {
        setWrongClick(cityId);
        setEscapedCities((prev) => new Set([...prev, cityId]));
        setTimeout(() => setWrongClick(null), 800);
      }
    },
    [onCorrect]
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-xl">
        {/* soru */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3">
            Berke&apos;nin en sevdiği şehir hangisi?
          </h2>
          <p className="text-sm text-muted">
            üzerine tıkla
          </p>
        </motion.div>

        {/* şehir kartları */}
        <div className="relative flex flex-col items-center gap-4">
          {cities.map((city, i) => {
            const isCorrect = city.id === correctCityId;
            const escaped = escapedCities.has(city.id);
            const isWrong = wrongClick === city.id;
            const escape = getEscapeDirection();

            return (
              <motion.button
                key={city.id}
                onClick={() => handleClick(city.id)}
                onMouseEnter={() => handleHover(city.id)}
                onTouchStart={() => !isCorrect && handleHover(city.id)}
                className={`w-full max-w-sm py-5 px-6 rounded-xl border text-left transition-colors ${
                  showCorrect && isCorrect
                    ? "border-accent bg-accent/10"
                    : isWrong
                    ? "border-red-300 bg-red-50"
                    : "border-border bg-card hover:border-muted"
                }`}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: escaped && !isCorrect ? 0 : 1,
                  x: escaped && !isCorrect ? escape.x : 0,
                  y: escaped && !isCorrect ? escape.y : 0,
                  rotate: escaped && !isCorrect ? escape.rotate : 0,
                  scale: showCorrect && isCorrect ? 1.05 : 1,
                }}
                transition={{
                  duration: escaped ? 0.5 : 0.4,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              >
                <span
                  className={`font-medium text-base ${
                    showCorrect && isCorrect
                      ? "text-accent"
                      : isWrong
                      ? "text-red-500"
                      : "text-foreground"
                  }`}
                >
                  {city.name}
                </span>

                {showCorrect && isCorrect && (
                  <motion.span
                    className="ml-3 text-sm text-accent"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    doğru!
                  </motion.span>
                )}

                {isWrong && (
                  <motion.span
                    className="ml-3 text-sm text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    yok artık
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
