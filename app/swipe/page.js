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
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  const childRefs = useRef(
    Array(profiles.length)
      .fill(0)
      .map(() => React.createRef())
  );

  const handleSwipe = (dir, profile, index) => {

    if (profile.isYou && dir === "right") {
      router.push("/success");
      return;
    }

    if (!profile.isYou && dir === "right") {
      setLaserTargetIndex(index);
      setLaserMode(true);

      setTimeout(() => {
        setLaserMode(false);
        setCurrentIndex(index - 1);
      }, 1200);

      return;
    }

    setCurrentIndex(index - 1);
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const cardRef = childRefs.current[currentIndex];
      if (cardRef?.current) {
        await cardRef.current.swipe(dir);
      }
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") swipe("left");
      if (e.key === "ArrowRight") swipe("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <motion.div
      animate={laserMode ? { x: [-6, 6, -6, 6, 0] } : {}}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-screen bg-lovePeach overflow-hidden"
    >

      <h1 className="text-3xl font-bold mb-6 text-loveTeal">
        Find Your Forever Partner 💘
      </h1>

      {/* CARTOON EXPLOSION OVERLAY */}
      {laserMode && (
        <div className="fixed inset-0 flex flex-col items-center justify-start pointer-events-none z-50">

          <motion.img
            src="/you.jpg"
            className="w-24 h-24 rounded-full mt-6 shadow-lg"
            initial={{ y: -200, rotate: 180 }}
            animate={{ y: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          <motion.div
            className="text-6xl mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ duration: 0.4 }}
          >
            💥✨💖
          </motion.div>

        </div>
      )}

      {/* Card Stack */}
      <div className="relative w-[90vw] max-w-sm aspect-[3/4]">

        {[...profiles].reverse().map((profile, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            key={profile.name}
            onSwipe={(dir) => handleSwipe(dir, profile, index)}
            preventSwipe={["up", "down"]}
            className="absolute inset-0"
          >

            <motion.div
              animate={
                laserMode && laserTargetIndex === index
                  ? {
                      scale: [1, 1.05, 0.95, 1.05, 0],
                      rotate: [0, -6, 6, -6, 25],
                      opacity: [1, 1, 1, 1, 0]
                    }
                  : { scale: 1, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.6 }}
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

      {/* Buttons */}
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
