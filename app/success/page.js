"use client";

import { motion } from "framer-motion";
import { Nanum_Brush_Script } from "next/font/google";
const brush = Nanum_Brush_Script({
  weight: "400",
  subsets: ["latin"],
});


export default function Success() {
  return (
      <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-lovePink to-loveTeal text-white text-center p-6 overflow-hidden">

      {/* Floating Hearts */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute text-5xl top-10 left-10"
      >
        ❤️
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute text-5xl bottom-10 right-10"
      >
        💕
      </motion.div>

      {/* Your Photo */}
      <motion.img
        src="/you.jpg"
        alt="You"
        className="w-48 h-48 rounded-full shadow-lg mb-6 object-cover"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Love Message */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`${brush.className} text-5xl mb-4`}
      >
        You Chose Correctly ❤️
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-lg max-w-xl"
      >
        Out of everyone in this world…  
        You still chose me.  
        And I promise to keep choosing you every single day.
      </motion.p>

      <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      className="text-2xl mt-8 font-semibold drop-shadow-md"
      >
      Happy Valentine’s Day 🌹
      </motion.h2>


    </div>
  );
}
