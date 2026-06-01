"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground leading-tight mb-6">
          Doğum günün
          <br />
          kutlu olsun
          <br />
          <span className="text-accent">can dostum</span>
        </h1>

        <p className="text-muted text-base mb-3 italic">
          seni çok seviyorum
        </p>

        <div className="w-12 h-px bg-border mx-auto my-8" />

        <p className="text-muted text-sm mb-10">
          sana küçük bir şey hazırladım
        </p>

        <motion.button
          onClick={onStart}
          className="px-8 py-3 rounded-full bg-foreground text-background text-sm font-medium tracking-wide hover:bg-accent transition-colors duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          bir bakalım
        </motion.button>
      </motion.div>
    </div>
  );
}
