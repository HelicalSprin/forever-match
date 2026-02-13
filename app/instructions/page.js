"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Instructions() {

  const router = useRouter();

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-lovePeach text-center px-6">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-loveTeal"
      >
        How Matching Works 💡
      </motion.h1>

      {/* SWIPE RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2">❤️ Swipe Right</h2>
        <p className="text-gray-700">
          Swipe right when you find your perfect partner.
        </p>
      </motion.div>

      {/* SWIPE LEFT */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-lg mb-10 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2">⬅️ Swipe Left</h2>
        <p className="text-gray-700">
          Swipe left if you are not interested.
        </p>
      </motion.div>

      {/* START BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/swipe")}
        className="bg-loveTeal text-white px-8 py-4 rounded-full shadow-lg text-lg"
      >
        Start Matching 💘
      </motion.button>

    </div>
  );
}
