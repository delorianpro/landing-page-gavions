"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  HERO_STEPS,
  OVERVIEW_ASSEMBLY_MS,
  OVERVIEW_MS,
  SECURITY_CARDS,
  TRANSITION_MS,
} from "./heroSequence.config";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
const getVisible = () => !document.hidden;
// Server-render an accessible overview; browser preferences never affect hydration.
const serverReducedMotion = () => true;
const serverVisible = () => false;

export function useHeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const clock = useRef({ key: "", elapsed: 0 });
  const [stage, setStage] = useState({ index: 0, exiting: false });
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverReducedMotion);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, serverVisible);
  const active = inView && visible && !paused && !reducedMotion;
  const step = HERO_STEPS[stage.index];
  const onEnded = useCallback(() => finishRef.current(), []);

  useEffect(() => {
    const hero = containerRef.current?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // This is the only owner of playback and stage timers. Active time is saved
  // on cleanup so leaving the Hero, hiding the tab, or pausing never skips steps.
  useEffect(() => {
    // Motion preference changes restart the overview's CSS entrance, so its
    // clock must restart too. Visibility changes still resume the same clock.
    const key = `${stage.index}:${stage.exiting}:${step === "overview" && reducedMotion}`;
    if (clock.current.key !== key) clock.current = { key, elapsed: 0 };
    if (!active) return;

    const started = performance.now();
    const elapsed = () => clock.current.elapsed + performance.now() - started;
    const video = videoRef.current;
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    const minimum = step === "phone" ? 0 : step === "overview"
      ? OVERVIEW_ASSEMBLY_MS + OVERVIEW_MS
      : TRANSITION_MS + SECURITY_CARDS[step].durationMs;

    const finish = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!disposed) setStage((current) => ({ ...current, exiting: true }));
      }, Math.max(0, minimum - elapsed()));
    };

    if (stage.exiting) {
      timer = setTimeout(() => {
        setStage((current) => ({ index: (current.index + 1) % HERO_STEPS.length, exiting: false }));
      }, Math.max(0, TRANSITION_MS - elapsed()));
    } else if (video) {
      finishRef.current = finish;
      if (video.ended || video.error) {
        finish();
      } else {
        // A stalled download must not trap the presentation on a single poster.
        // Advancing playback is never cut short by this watchdog.
        let previousTime = video.currentTime;
        const checkProgress = () => {
          if (video.currentTime === previousTime) {
            finish();
          } else {
            previousTime = video.currentTime;
            timer = setTimeout(checkProgress, 10000);
          }
        };
        timer = setTimeout(checkProgress, 10000);
        void video.play().catch(() => {
          if (!disposed) finish();
        });
      }
    } else {
      finish();
    }

    return () => {
      disposed = true;
      clock.current.elapsed = elapsed();
      clearTimeout(timer);
      finishRef.current = () => {};
      video?.pause();
    };
  }, [active, stage.index, stage.exiting, step, reducedMotion]);

  return {
    containerRef, videoRef, onEnded, step, active, paused, reducedMotion,
    exiting: stage.exiting,
    togglePaused: () => setPaused((current) => !current),
  };
}
