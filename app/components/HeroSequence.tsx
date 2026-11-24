"use client";

import Image from "next/image";
import type { CSSProperties, RefObject } from "react";
import HeroPhone from "./HeroPhone";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  CARD_ORDER,
  OVERVIEW_GAP_MS,
  OVERVIEW_CARD_MS,
  OVERVIEW_STAGGER_MS,
  SECURITY_CARDS,
  TRANSITION_MS,
  type CardId,
} from "./heroSequence.config";
import { useHeroSequence } from "./useHeroSequence";
import styles from "./HeroSequence.module.css";

function StatusIcon({ id }: { id: CardId }) {
  if (id === "whatsapp") return <WhatsAppIcon />;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === "camera" && <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />}
      {id === "reflector" && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
      {id === "siren" && <><path d="M6 18v-6a6 6 0 0 1 12 0v6M4 18h16v3H4zM12 2v1M3 5l2 2m14 0 2-2M1 12h2m18 0h2M9 14v-2a3 3 0 0 1 3-3" /></>}
    </svg>
  );
}

type SecurityCardProps = {
  id: CardId;
  compact?: boolean;
  videoRef?: RefObject<HTMLVideoElement | null>;
  onEnded?: () => void;
};

function SecurityCard({ id, compact = false, videoRef, onEnded }: SecurityCardProps) {
  const card = SECURITY_CARDS[id];
  const showVideo = !compact && card.video;
  const image = compact ? card.overviewImage : card.poster;

  return (
    <article
      className={`${styles.card} ${compact ? styles.compact : ""}`}
      data-card={id}
    >
      <div className={styles.cardHeader}>
        <span className={styles.badge}>
          <StatusIcon id={id} />
          <span>
            <span className={styles.badgeLabel}>{card.label} </span>
            <em>{card.labelHighlight}</em>
          </span>
        </span>
      </div>
      <div className={styles.media}>
        {showVideo ? (
          <video
            ref={videoRef}
            src={card.video}
            poster={card.poster}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onEnded={onEnded}
            onError={onEnded}
          />
        ) : image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={compact ? "(max-width: 768px) 40vw, 200px" : "(max-width: 768px) 85vw, 384px"}
          />
        ) : null}
      </div>
      <h3 className={styles.cardTitle}>
        {card.title}<span>{card.titleHighlight}</span>
      </h3>
    </article>
  );
}

export default function HeroSequence() {
  const {
    containerRef,
    videoRef,
    onEnded,
    step,
    active,
    reducedMotion,
    exiting,
  } = useHeroSequence();
  const overview = reducedMotion || step === "overview";

  return (
    <div
      ref={containerRef}
      className={styles.sequence}
      data-active={active}
      data-reduced-motion={reducedMotion}
      data-step={reducedMotion ? "overview" : step}
      style={{
        "--sequence-transition": `${TRANSITION_MS}ms`,
        "--overview-gap": `${OVERVIEW_GAP_MS}ms`,
        "--overview-entry": `${OVERVIEW_CARD_MS}ms`,
        "--overview-stagger": `${OVERVIEW_STAGGER_MS}ms`,
      } as CSSProperties}
    >
      <p className={styles.srOnly}>
        Como a Gavions protege seu imóvel: a câmera com IA detecta, o refletor
        acende, o alarme dispara e você recebe o alerta no WhatsApp.
      </p>
      <div className={styles.stage} aria-hidden={!reducedMotion}>
        <div
          key={reducedMotion ? "static" : step}
          className={`${styles.layer} ${overview ? styles.overview : styles.single}`}
          data-exiting={!reducedMotion && exiting}
        >
          {overview ? CARD_ORDER.map((id) => <SecurityCard key={id} id={id} compact />) : step === "phone" ? (
            <HeroPhone videoRef={videoRef} onEnded={onEnded} />
          ) : (
            <SecurityCard id={step as CardId} videoRef={videoRef} onEnded={onEnded} />
          )}
        </div>
      </div>
    </div>
  );
}
