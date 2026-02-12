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

  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        router.push("/swipe");
      }, 2000);
    }
  }, [index, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-loveGold text-loveTeal text-center">

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

    </div>
  );
}
