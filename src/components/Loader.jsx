// src/components/Loader.jsx

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, memo } from "react";

// ============================================================================
// BAGIAN 1: KONSTANTA DAN DATA GENERATOR (DIPINDAHKAN KE LUAR KOMPONEN)
// PERUBAHAN KUNCI: Ini mencegah kalkulasi ulang yang berat pada setiap render.
// ============================================================================

const randomBetween = (min, max) => Math.random() * (max - min) + min;

// --- Data untuk Floating Shapes ---
const colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
const generateOrbitKeyframes = (radius, direction = "ccw") => {
  const numPoints = 12;
  const xKeyframes = [],
    yKeyframes = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    xKeyframes.push(x);
    yKeyframes.push(y);
  }
  if (direction === "cw") yKeyframes.reverse();
  return { x: xKeyframes, y: yKeyframes };
};

const shapesData = Array.from({ length: 15 }).map((_, i) => {
  const radius = randomBetween(50, 150);
  const direction = Math.random() > 0.5 ? "cw" : "ccw";
  return {
    id: `shape-${i}`,
    top: `${randomBetween(-15, 115)}%`,
    left: `${randomBetween(-15, 115)}%`,
    size: randomBetween(30, 100),
    color: colors[i % colors.length],
    borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "30%"][i % 3],
    animationDuration: randomBetween(25, 45),
    orbitKeyframes: generateOrbitKeyframes(radius, direction),
  };
});

// --- Data untuk Glitch Text ---
const glitchCharacters =
  "` { } [ ] ( ) < > / \\ ; : ! ? # % & * ^ ~ $ @ _ - + = | 0 1".split(" ");
const glitchData = Array.from({ length: 150 }).map((_, i) => ({
  id: `glitch-${i}`,
  char: glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)],
  top: `${randomBetween(-10, 100)}%`,
  left: `${randomBetween(0, 100)}%`,
  fontSize: randomBetween(12, 36),
  delay: randomBetween(0, 20),
  duration: randomBetween(4, 12),
  fallDistance: randomBetween(100, 300),
}));

// ============================================================================
// BAGIAN 2: KOMPONEN LATAR BELAKANG (SUDAH DI-MEMOIZE)
// ============================================================================

const FloatingShapesBackground = () => (
  <div className="absolute inset-0 z-0">
    {shapesData.map((shape) => (
      <motion.div
        key={shape.id}
        className="absolute"
        style={{
          width: shape.size,
          height: shape.size,
          borderRadius: shape.borderRadius,
          backgroundColor: shape.color,
          top: shape.top,
          left: shape.left,
          opacity: 0.5,
        }}
        animate={{
          x: shape.orbitKeyframes.x,
          y: shape.orbitKeyframes.y,
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: shape.animationDuration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      />
    ))}
  </div>
);
const MemoizedFloatingShapes = memo(FloatingShapesBackground);

const glitchVariants = {
  initial: { opacity: 0 },
  animate: (custom) => ({
    opacity: [0, 0.25, 0.8, 0.3, 0.9, 0.4, 0],
    y: [0, custom.fallDistance],
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      repeat: Infinity,
      ease: "linear",
    },
  }),
};
const GlitchTextBackground = () => (
  <div className="absolute inset-0 z-10 pointer-events-none">
    {glitchData.map((el) => (
      <motion.span
        key={el.id}
        variants={glitchVariants}
        initial="initial"
        animate="animate"
        custom={{
          duration: el.duration,
          delay: el.delay,
          fallDistance: el.fallDistance,
        }}
        className="absolute text-cyan-400 font-mono"
        style={{ top: el.top, left: el.left, fontSize: `${el.fontSize}px` }}
      >
        {el.char}
      </motion.span>
    ))}
  </div>
);
const MemoizedGlitchText = memo(GlitchTextBackground);

// ============================================================================
// BAGIAN 3: KOMPONEN LOADER UTAMA
// ============================================================================

const sentenceVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const letterVariants = {
  hidden: (custom) => ({ opacity: 0, y: custom.y, x: custom.x }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      delay: custom.delay,
    },
  }),
};
const contentVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Loader = ({ onLoaded }) => {
  const progress = useMotionValue(0);
  const textToAnimate = "Welcome to My Portfolio";
  const words = textToAnimate.split(" ");
  const displayText = useTransform(
    progress,
    (latest) => `${Math.round(latest)}%`
  );
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // PERBAIKAN: Logika disederhanakan.
    // Kita hanya perlu 'onComplete' dari 'animate' untuk tahu kapan loading selesai.
    // Tidak perlu lagi 'onChange' atau flag 'isDone' yang rumit.
    const barAnimation = animate(progress, 100, {
      duration: 3.5,
      ease: "linear",
      onComplete: () => {
        setIsAnimationComplete(true);
      },
    });

    // Cukup hentikan animasi saat komponen unmount.
    return () => {
      barAnimation.stop();
    };
  }, [progress, onLoaded]); // Menambahkan onLoaded ke dependency array untuk best practice

  return (
    <motion.div
      className="fixed inset-0 bg-slate-900 z-[9999] overflow-hidden"
      exit={{
        filter: "blur(20px)",
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.5, ease: "easeIn" },
      }}
    >
      <MemoizedFloatingShapes />
      <MemoizedGlitchText />

      <div className="relative z-20 w-full h-full flex items-start justify-center pt-48">
        <div className="flex flex-col items-center w-full max-w-4xl text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white text-center px-4"
            style={{ fontFamily: "'Tilt Prism', sans-serif" }} // Pastikan font ini diimpor di file CSS/index.html Anda
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="inline-block mr-3 md:mr-4">
                {word.split("").map((letter, letterIndex) => {
                  const randomY = randomBetween(-200, -50);
                  const randomX = randomBetween(-200, 200);
                  const randomDelay = randomBetween(0, 1.5);
                  return (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      variants={letterVariants}
                      custom={{ y: randomY, x: randomX, delay: randomDelay }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </motion.h1>
          <div className="h-12" />

          <div className="w-full px-4 lg:px-0 h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isAnimationComplete ? (
                <motion.div
                  key="progress-bar"
                  className="w-full"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{ width: displayText }}
                      />
                    </div>
                    <motion.span className="font-mono text-cyan-400 w-12 text-left">
                      {displayText}
                    </motion.span>
                  </div>
                  <p className="text-slate-400 text-sm tracking-widest">
                    LOADING...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="next-button"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.button
                    onClick={onLoaded}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="font-mono text-lg text-cyan-400 border border-cyan-400 rounded-lg px-8 py-3 hover:bg-cyan-400/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Start
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Loader); // Juga memoize komponen utama sebagai praktik baik
