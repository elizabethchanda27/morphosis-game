"use client";
import React, { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Only create the audio element if it doesn't already exist
    let audio = document.getElementById(
      "global-bg-music"
    ) as HTMLAudioElement | null;
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "global-bg-music";
      audio.src = "/music/background.mp3";
      audio.loop = true;
      audio.autoplay = true;
      audio.style.display = "none";
      document.body.appendChild(audio);

      const playAudio = () => {
        audio?.play().catch(() => {});
        document.removeEventListener("click", playAudio);
      };
      document.addEventListener("click", playAudio);
    }

    // Always update mute state for all audio elements with this id
    document.querySelectorAll("#global-bg-music").forEach((el) => {
      (el as HTMLAudioElement).muted = muted;
    });

    // Do NOT remove the audio element on unmount!
  }, [muted]);

  // Floating mute/unmute button
  return (
    <>
      {children}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          background: muted ? "#ffb3b3" : "#b3ffd8",
          color: "#222",
          border: "2px solid #222",
          borderRadius: 24,
          padding: "0.5rem 1.2rem",
          fontFamily: "Press Start 2P, system-ui, sans-serif",
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s",
        }}
        aria-label={muted ? "Unmute Music" : "Mute Music"}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
