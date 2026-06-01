"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "first_song" | "joke" | "second_song";

export function SurpriseScreen() {
  const [phase, setPhase] = useState<Phase>("first_song");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transitionDone = useRef(false);

  const goToJoke = useCallback(() => {
    if (transitionDone.current) return;
    transitionDone.current = true;
    if (audioRef.current) audioRef.current.pause();
    setPhase("joke");
    setTimeout(() => setPhase("second_song"), 3000);
  }, []);

  // ilk şarkıyı başlat
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onReady = () => {
      // ortadan başlat
      el.currentTime = el.duration * 0.4;
      el.play().catch(() => {});
    };

    el.addEventListener("canplaythrough", onReady, { once: true });
    el.load();

    return () => el.removeEventListener("canplaythrough", onReady);
  }, []);

  // 10 sn sonra geçiş
  useEffect(() => {
    if (phase !== "first_song") return;
    const t = setTimeout(goToJoke, 10000);
    return () => clearTimeout(t);
  }, [phase, goToJoke]);

  return (
    <div className="min-h-screen bg-background">
      {/* gizli audio - ilk şarkı */}
      <audio ref={audioRef} src="/music1.mp3" preload="auto" />

      <AnimatePresence mode="wait">
        {/* AŞAMA 1 */}
        {phase === "first_song" && (
          <motion.div
            key="first"
            className="min-h-screen flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-muted text-sm mb-8">♫ Tekirdağ Karşılama</p>
            <div className="flex items-end justify-center gap-1 h-10 mb-10">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-accent/50 rounded-full"
                  animate={{ height: [3, 14 + (i % 6) * 3, 3] }}
                  transition={{ duration: 0.6 + (i % 4) * 0.12, repeat: Infinity, delay: i * 0.035 }}
                />
              ))}
            </div>
            <button
              onClick={goToJoke}
              className="text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
            >
              atla
            </button>
          </motion.div>
        )}

        {/* AŞAMA 2 */}
        {phase === "joke" && (
          <motion.div
            key="joke"
            className="min-h-screen flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-center max-w-xl">
              <motion.h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
              >
                şaka şaka
              </motion.h2>
              <motion.p
                className="font-serif text-xl sm:text-2xl text-accent mt-5 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45 }}
              >
                doğum günün kutlu olsun can dostum
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* AŞAMA 3 */}
        {phase === "second_song" && (
          <motion.div
            key="final"
            className="min-h-screen flex flex-col items-center px-6 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SecondSongView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SecondSongView() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    const t = setTimeout(() => audioRef.current?.play().catch(() => {}), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/music2.mp3" loop preload="auto" />

      {/* şarkı adı + visualizer */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-muted text-sm mb-4">♫ Dostum Dostum</p>
        <div className="flex items-end justify-center gap-1 h-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-accent/40 rounded-full"
              animate={{ height: [2, 8 + (i % 5) * 2, 2] }}
              transition={{ duration: 0.5 + (i % 3) * 0.08, repeat: Infinity, delay: i * 0.025 }}
            />
          ))}
        </div>
      </motion.div>

      {/*Satır 1: p1 + p2 + p3 */}
      <div className="w-full max-w-3xl mb-3">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="rounded-lg overflow-hidden bg-warm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
          >
            <img src="/p1.jpg" className="w-full aspect-[3/4] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden bg-warm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
          >
            <img src="/p2.jpg" className="w-full aspect-[3/4] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden bg-warm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <img src="/p3.jpg" className="w-full aspect-[3/4] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </motion.div>
        </div>
      </div>

      {/*Satır 2: p4 + p5 */}
      <div className="w-full max-w-3xl mb-3">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="rounded-lg overflow-hidden bg-warm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.45 }}
          >
            <img src="/p4.jpg" className="w-full aspect-[4/3] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden bg-warm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
          >
            <img src="/p5.jpg" className="w-full aspect-[4/3] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </motion.div>
        </div>
      </div>

      {/*Satır 3: toplu foto — tam genişlik */}
      <div className="w-full max-w-3xl mb-10">
        <motion.div
          className="rounded-lg overflow-hidden bg-warm border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.45 }}
        >
          <img src="/toplu-foto.jpg" className="w-full aspect-[16/9] object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </motion.div>
      </div>

      {/* forma */}
      <motion.div
        className="w-40 mb-10 self-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.45 }}
      >
        <div className="rounded-xl overflow-hidden bg-warm border border-border">
          <img
            src="/adidas-fenerbahce-1819-erkek-cubuklu-for-80aa.jpg"
            alt="Fenerbahçe formamız"
            className="w-full aspect-[3/4] object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </motion.div>

      {/* mesaj */}
      <motion.div
        className="text-center max-w-md mt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <p className="font-serif text-lg sm:text-xl text-foreground/80 italic leading-relaxed">
          seninle her an çok güzel...
          <br />
          nice senelere beraber.
        </p>
      </motion.div>

      {/* alıntı */}
      <motion.div
        className="text-center max-w-lg mt-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="w-10 h-px bg-border mx-auto mb-6" />
        <p className="text-sm text-muted italic leading-relaxed">
          &ldquo;Menfaat caddesinde tanışmadık ki çile yokuşunda terk edelim.&rdquo;
        </p>
        <p className="text-xs text-muted/60 mt-2">— Domenico Tedesco</p>
      </motion.div>

      {/* son foto */}
      <motion.div
        className="w-full max-w-2xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.45 }}
      >
        <div className="rounded-xl overflow-hidden bg-warm border border-border">
          <img
            src="/IMG_2564.JPG"
            alt="fotoğraf"
            className="w-full aspect-[4/3] object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </motion.div>
    </>
  );
}
