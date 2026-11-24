"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (preference.matches) {
        video.pause();
        return;
      }

      // No video download on initial load when reduced motion is enabled.
      if (!video.getAttribute("src")) {
        video.src = "/assets/hero-bg-gavions.webm";
      }
      void video.play().catch(() => {
        // Keep the static background if the browser blocks autoplay.
      });
    };

    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => {
      preference.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
