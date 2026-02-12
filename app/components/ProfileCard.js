"use client";

import TinderCard from "react-tinder-card";

export default function ProfileCard({ profile, onSwipe, style, cardRef }) {
  return (
    <TinderCard
      ref={cardRef}
      onSwipe={(dir) => onSwipe(dir)}
      preventSwipe={["up", "down"]}
      className="absolute"
      style={style}
    >
      <div className="w-80 h-[450px] bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
          {profile.name}
        </h2>
      </div>
    </TinderCard>
  );
}
