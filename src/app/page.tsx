"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { SurpriseScreen } from "@/components/SurpriseScreen";

type Step = "welcome" | "quiz" | "surprise";

export default function Home() {
  const [step, setStep] = useState<Step>("welcome");

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WelcomeScreen onStart={() => setStep("quiz")} />
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizScreen onCorrect={() => setStep("surprise")} />
          </motion.div>
        )}

        {step === "surprise" && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SurpriseScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
