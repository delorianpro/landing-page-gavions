"use client";

import Image from "next/image";
import type { RefObject } from "react";
import phoneFrame from "@/public/assets/hero-celular.webp";
import styles from "./HeroPhone.module.css";

type HeroPhoneProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  onEnded: () => void;
};

export default function HeroPhone({ videoRef, onEnded }: HeroPhoneProps) {

  return (
    <div
      className={styles.phone}
      role="img"
      aria-label="Celular exibindo imagens de uma câmera de segurança Gavions"
    >
      <div className={styles.screen}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/assets/hero-video-celular-bg.webm"
          poster="/assets/hero-video-celular-poster.webp"
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onEnded={onEnded}
          onError={onEnded}
        />
      </div>
      <Image
        className={styles.frame}
        src={phoneFrame}
        alt=""
        sizes="(max-width: 768px) 288px, (max-width: 1309px) 22vw, 288px"
        loading="eager"
        unoptimized
      />
    </div>
  );
}
