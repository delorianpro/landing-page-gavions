export const CARD_ORDER = ["camera", "reflector", "siren", "whatsapp"] as const;
export type CardId = (typeof CARD_ORDER)[number];
export type HeroStep = "phone" | CardId | "overview";

type SecurityCard = {
  label: string;
  labelHighlight: string;
  title: string;
  titleHighlight: string;
  poster?: string;
  overviewImage: string;
  video?: string;
  durationMs: number;
};

// Videos play once and advance through onEnded; durationMs is only the minimum
// visible time, never a playback cutoff. Overview always uses stills.
export const SECURITY_CARDS: Record<CardId, SecurityCard> = {
  camera: {
    label: "IA ATIVA ·",
    labelHighlight: "VARREDURA",
    title: "A IA da Gavions",
    titleHighlight: "detecta",
    poster: "/assets/hero-camera-poster.webp",
    overviewImage: "/assets/hero-camera-overview.webp",
    video: "/assets/hero-camera-move.webm",
    durationMs: 3000,
  },
  reflector: {
    label: "ILUMINAÇÃO",
    labelHighlight: "IMEDIATA",
    title: "O refletor",
    titleHighlight: "acende",
    poster: "/assets/refletor-potente.webp",
    overviewImage: "/assets/hero-refletor-overview-ofc.webp",
    video: "/assets/hero-refletor.webm",
    durationMs: 3000,
  },
  siren: {
    label: "ALERTA",
    labelHighlight: "SONORO",
    title: "A sirene",
    titleHighlight: "dispara",
    poster: "/assets/alarme-sonoro.webp",
    overviewImage: "/assets/hero-sirene-overview-ofc.webp",
    video: "/assets/hero-sirene-ofc.webm",
    durationMs: 3000,
  },
  whatsapp: {
    label: "NOTIFICAÇÃO NO",
    labelHighlight: "WHATSAPP",
    title: "Você recebe",
    titleHighlight: "o alerta",
    overviewImage: "/assets/hero-whatsapp-overview.webp",
    video: "/assets/hero-celular-notificação.webm",
    durationMs: 3000,
  },
};

export const HERO_STEPS: readonly HeroStep[] = ["phone", ...CARD_ORDER, "overview"];
export const TRANSITION_MS = 500;
export const OVERVIEW_MS = 4000;
export const OVERVIEW_GAP_MS = 200;
export const OVERVIEW_CARD_MS = 350;
export const OVERVIEW_STAGGER_MS = 400;
export const OVERVIEW_ASSEMBLY_MS = OVERVIEW_GAP_MS + OVERVIEW_CARD_MS +
  (CARD_ORDER.length - 1) * OVERVIEW_STAGGER_MS;
