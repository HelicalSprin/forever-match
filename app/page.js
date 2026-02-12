"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-lovePink via-lovePeach to-loveGold text-white text-center p-6">

      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6"
      >
        Welcome to ForeverMatch 💘
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg max-w-md mb-8"
      >
        Today, we will find your perfect match.  
        Swipe carefully… your forever might be waiting.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/matchmaking")}
        className="bg-loveTeal hover:bg-lovePink transition-colors text-white px-6 py-3 rounded-full text-lg shadow-lg"
      >
        Start Matching ❤️
      </motion.button>

    </div>
  );
}
