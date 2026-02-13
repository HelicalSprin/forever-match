"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";
import profiles from "../data/profiles";

export default function Home() {

  const router = useRouter();

  const [laserMode, setLaserMode] = useState(false);
  const [laserTargetIndex, setLaserTargetIndex] = useState(null);
  const [animationLock, setAnimationLock] = useState(false);
  const [snapBack, setSnapBack] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  const childRefs = useRef(
    Array(profiles.length)
      .fill(0)
      .map(() => React.createRef())
  );

  // ================= SWIPE HANDLER =================

  const handleSwipe = (dir, profile, index) => {

    if (animationLock) return;

    // ⭐ YOUR CARD
    if (profile.isYou) {

      if (dir === "right") {
        router.push("/success");
        return;
      }

      if (dir === "left") {
        setSnapBack(true);
        setTimeout(() => setSnapBack(false), 500);
        return;
      }
    }

    // ⭐ WRONG RIGHT SWIPE → EXPLOSION
    if (!profile.isYou && dir === "right") {

      setAnimationLock(true);
      setLaserTargetIndex(index);
      setLaserMode(true);

      setTimeout(() => {

        setLaserMode(false);
        setCurrentIndex(index - 1);

        setTimeout(() => {
          setAnimationLock(false);
        }, 400);

      }, 2000); // ⭐ Explosion visible 2 sec

      return;
    }

    // ⭐ NORMAL LEFT SWIPE
    setCurrentIndex(index - 1);
  };

  // ================= PROGRAMMATIC SWIPE =================

  const swipe = async (dir) => {

    if (animationLock) return;

    if (currentIndex >= 0) {
      const cardRef = childRefs.current[currentIndex];
      if (cardRef?.current) {
        await cardRef.current.swipe(dir);
      }
    }
  };

  // ================= KEYBOARD SUPPORT =================

  useEffect(() => {

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") swipe("left");
      if (e.key === "ArrowRight") swipe("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [currentIndex, animationLock]);

  // ================= UI =================

  return (

    <motion.div
      animate={laserMode ? { x: [-25, 25, -20, 20, -10, 10, 0] } : {}}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-screen bg-lovePeach overflow-hidden"
    >

      <h1 className="text-3xl font-bold mb-6 text-loveTeal">
        Find Your Forever Partner 💘
      </h1>

      {/* ⭐ EXPLOSION OVERLAY */}
      {laserMode && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">

          {/* DARK CINEMATIC FADE */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* IMPACT FLASH */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.9, 0] }}
            transition={{ duration: 0.25 }}
          />

          {/* 👹 DEVILS FROM 4 DIRECTIONS */}

{/* TOP */}
<motion.img
  src="/devil.png"
  className="w-28 absolute top-0 drop-shadow-[0_0_25px_red]"
  initial={{ y: -300, rotate: 180 }}
  animate={{ y: 0, rotate: 180 }}
  transition={{ type: "spring", stiffness: 220 }}
/>

{/* LEFT */}
<motion.img
  src="/devil.png"
    className="w-28 absolute top-0 drop-shadow-[0_0_25px_red]"
  initial={{ x: -300, rotate: 90 }}
  animate={{ x: 0, rotate: 90 }}
  transition={{ type: "spring", stiffness: 220 }}
/>

{/* RIGHT */}
<motion.img
  src="/devil.png"
    className="w-28 absolute top-0 drop-shadow-[0_0_25px_red]"
  initial={{ x: 300, rotate: -90 }}
  animate={{ x: 0, rotate: -90 }}
  transition={{ type: "spring", stiffness: 220 }}
/>

{/* BOTTOM */}
<motion.img
  src="/devil.png"
    className="w-28 absolute top-0 drop-shadow-[0_0_25px_red]"
  initial={{ y: 300 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 220 }}
/>


          {/* SHOCKWAVE */}
          <motion.div
            className="w-44 h-44 border-4 border-red-500 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 7, opacity: 0 }}
            transition={{ duration: 0.7 }}
          />

          {/* PARTICLES */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-red-500 rounded-full"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300,
                opacity: 0
              }}
              transition={{ duration: 0.8 }}
            />
          ))}

          {/* DEVIL MESSAGE */}
          <motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
  className="absolute inset-0 flex items-center justify-center"
>
  <motion.p
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, duration: 1 }}
  className="text-red-500 font-black text-5xl md:text-7xl tracking-widest drop-shadow-[0_0_20px_red] text-center"
>
  👹 DEVIL DESTROYED THE CARD
</motion.p>

</motion.div>


        </div>
      )}

      {/* ================= CARD STACK ================= */}

      <div className="relative w-[90vw] max-w-sm aspect-3/4 touch-pan-y select-none">

        {[...profiles].reverse().map((profile, index) => {

          const isActive = index === currentIndex;
          const isNext = index === currentIndex - 1;

          return (

            <TinderCard
              ref={childRefs.current[index]}
              key={profile.name}
              onSwipe={(dir) => handleSwipe(dir, profile, index)}
              preventSwipe={
                profile.isYou
                  ? ["up", "down", "left"]
                  : ["up", "down"]
              }
              className="absolute inset-0"
            >

              <motion.div
                animate={
                  laserMode && laserTargetIndex === index
                    ? {
                        scale: [1, 1.2, 0.4],
                        rotate: [0, -20, 45],
                        opacity: [1, 1, 0]
                      }
                    : snapBack && profile.isYou
                    ? {
                        x: [-120, 60, -30, 15, 0],
                        rotate: [-12, 6, -3, 2, 0]
                      }
                    : {
                        scale: isActive ? 1 : 0.92,
                        filter: isActive
                          ? "blur(0px)"
                          : isNext
                          ? "blur(6px)"
                          : "blur(12px)",
                        opacity: isActive ? 1 : isNext ? 0.6 : 0.2
                      }
                }

                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full rounded-xl shadow-lg overflow-hidden"
              >

                <img
                  src={profile.image}
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
                  {profile.name}
                </h2>

              </motion.div>

            </TinderCard>
          );
        })}

      </div>

      {/* SWIPE HINT */}

      <motion.p
        animate={{ x: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-6 text-loveTeal opacity-70 text-sm"
      >
        ← Swipe →
      </motion.p>

    </motion.div>
  );
}
