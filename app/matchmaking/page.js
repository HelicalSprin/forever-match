"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Matchmaking() {

  const router = useRouter();

  const messages = [
    "Scanning soulmate database 💾",
    "Checking heart compatibility ❤️",
    "Filtering wrong partners ❌",
    "Calculating destiny match 💫",
    "Preparing your forever person 💘"
  ];

  const [index, setIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  // ================= LOADING PHASE =================

  useEffect(() => {

    if (!showInstructions) {

      if (index < messages.length - 1) {

        const timer = setTimeout(() => {
          setIndex(index + 1);
        }, 1800);

        return () => clearTimeout(timer);

      } else {

        setTimeout(() => {
          setShowInstructions(true);
        }, 1800);

      }
    }

  }, [index, showInstructions]);

  // ================= UI =================

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-loveGold text-loveTeal text-center px-6">

      {!showInstructions ? (

        // ⭐ LOADING SCREEN
        <>
          <motion.h1
            key={messages[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-semibold"
          >
            {messages[index]}
          </motion.h1>

          <motion.div
            className="mt-8 text-5xl"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            💞
          </motion.div>
        </>

      ) : (

        // ⭐ INSTRUCTIONS SCREEN
        <>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8"
          >
            How Matching Works 💡
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-sm text-gray-700"
          >
            <h2 className="text-xl font-bold mb-2 text-loveTeal">
              ❤️ Swipe Right
            </h2>
            Swipe right when you find your perfect partner.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-10 w-full max-w-sm text-gray-700"
          >
            <h2 className="text-xl font-bold mb-2 text-loveTeal">
              ⬅️ Swipe Left
            </h2>
            Swipe left if you are not interested.
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/swipe")}
            className="bg-loveTeal text-white px-8 py-4 rounded-full shadow-lg text-lg"
          >
            Start Matching 💘
          </motion.button>
        </>

      )}

    </div>
  );
}
