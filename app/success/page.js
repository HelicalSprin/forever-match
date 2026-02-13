"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function Success() {

  const [screen, setScreen] = useState({
    width: 0,
    height: 0
  });

  // ⭐ SAFE window access
  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-lovePink via-lovePeach to-loveGold text-white text-center p-6">

      {/* 🎉 CONFETTI */}
      {screen.width > 0 && (
        <Confetti
          width={screen.width}
          height={screen.height}
          numberOfPieces={200}
          recycle={true}
          gravity={0.15}
        />
      )}

      {/* ❤️ HEART RAIN */}
      {screen.width > 0 &&
        [...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{
              y: -100,
              x: Math.random() * screen.width
            }}
            animate={{
              y: screen.height + 100
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random()
            }}
          >
            💖
          </motion.div>
        ))}

      {/* ✨ SPARKLES */}
      {screen.width > 0 &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * screen.width,
              y: Math.random() * screen.height
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ✨
          </motion.div>
        ))}

      {/* 🌟 YOUR PHOTO */}
      <motion.img
        src="/you.jpg"
        alt="You"
        className="w-52 h-52 rounded-full shadow-2xl mb-8 object-cover border-4 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
      />

      {/* 💓 MAIN TEXT */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-5xl font-extrabold mb-4 drop-shadow-xl"
      >
        You Chose Correctly ❤️
      </motion.h1>

      {/* 💬 MESSAGE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-xl max-w-xl leading-relaxed"
      >
        Out of everyone in this world…  
        You still chose me.  
        And I promise to keep choosing you every single day.
      </motion.p>

      {/* 🌹 FINAL MESSAGE */}
      <motion.h2
  initial={{ opacity: 0, scale: 0.6, y: 60 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ delay: 2.3, type: "spring", stiffness: 120 }}
  className="text-6xl md:text-7xl mt-12 font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] tracking-wide text-center"
>
  Happy Valentine’s Day 🌹
</motion.h2>


    </div>
  );
}
