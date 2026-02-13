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
  const [snapBack, setSnapBack] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  const childRefs = useRef(
    Array(profiles.length)
      .fill(0)
      .map(() => React.createRef())
  );

  // ================= SWIPE HANDLER =================

  const handleSwipe = (dir, profile, index) => {

    // ⭐ YOUR CARD LOGIC
    if (profile.isYou) {

      if (dir === "right") {
        router.push("/success");
        return;
      }

      if (dir === "left") {
        setSnapBack(true);

        setTimeout(() => {
          setSnapBack(false);
        }, 500);

        return;
      }
    }

    // ⭐ WRONG RIGHT SWIPE = EXPLOSION
    if (!profile.isYou && dir === "right") {

      setLaserTargetIndex(index);
      setLaserMode(true);

      setTimeout(() => {
        setLaserMode(false);
        setCurrentIndex(index - 1);
      }, 900);

      return;
    }

    // ⭐ NORMAL LEFT SWIPE
    setCurrentIndex(index - 1);
  };

  // ================= BUTTON SWIPE =================

  const swipe = async (dir) => {

    if (currentIndex >= 0) {
      const cardRef = childRefs.current[currentIndex];

      if (cardRef?.current) {
        await cardRef.current.swipe(dir);
      }
    }
  };

  // ================= ARROW KEY SUPPORT =================

  useEffect(() => {

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") swipe("left");
      if (e.key === "ArrowRight") swipe("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [currentIndex]);

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

          {/* FLASH */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.9, 0] }}
            transition={{ duration: 0.25 }}
          />

          {/* UPSIDE DOWN FACE */}
          <motion.img
            src="/you.jpg"
            className="w-24 h-24 rounded-full absolute top-10 shadow-lg"
            initial={{ y: -200, rotate: 180 }}
            animate={{ y: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          {/* SHOCKWAVE */}
          <motion.div
            className="w-40 h-40 border-4 border-white rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* PARTICLES */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.random() * 500 - 250,
                y: Math.random() * 500 - 250,
                opacity: 0
              }}
              transition={{ duration: 0.8 }}
            />
          ))}

        </div>
      )}

      {/* ================= CARD STACK ================= */}

      <div className="relative w-[90vw] max-w-sm aspect-[3/4]">

        {[...profiles].reverse().map((profile, index) => (

          <TinderCard
            ref={childRefs.current[index]}
            key={profile.name}
            onSwipe={(dir) => handleSwipe(dir, profile, index)}
            preventSwipe={
              profile.isYou
                ? ["up", "down", "left"]   // ⭐ prevents rejecting YOU
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

                  : { scale: 1, rotate: 0, opacity: 1 }
              }

              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 250
              }}

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

        ))}

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="flex gap-6 mt-6">

        <button
          onClick={() => swipe("left")}
          className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          ⬅️ Reject
        </button>

        <button
          onClick={() => swipe("right")}
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          ❤️ Accept
        </button>

      </div>

    </motion.div>
  );
}
