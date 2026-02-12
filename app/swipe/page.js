"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TinderCard from "react-tinder-card";
import profiles from "../data/profiles";

export default function Home() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  // Create refs once (NOT using hooks inside map)
  const childRefs = useRef(
    Array(profiles.length)
      .fill(0)
      .map(() => React.createRef())
  );

  const handleSwipe = (dir, profile, index) => {

    // YOU card
    if (profile.isYou && dir === "right") {
      router.push("/success");
      return;
    }

    // Wrong selection
    if (!profile.isYou && dir === "right") {
      alert("❌ Compatibility Error");
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

  // Arrow Keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") swipe("left");
      if (e.key === "ArrowRight") swipe("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lovePeach">

      <h1 className="text-3xl font-bold mb-6 text-loveTeal">
        Find Your Forever Partner 💘
      </h1>

      {/* Card Stack */}
        <div className="relative w-[90vw] max-w-sm aspect-3/4">

        {[...profiles].reverse().map((profile, index) => (
          <TinderCard
  ref={childRefs.current[index]}
  key={profile.name}
  onSwipe={(dir) => handleSwipe(dir, profile, index)}
  preventSwipe={["up", "down"]}
  className="absolute inset-0"
>

        <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden">


                            <img
                src={profile.image}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover"
                />


              <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
                {profile.name}
              </h2>

            </div>
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

    </div>
  );
}
