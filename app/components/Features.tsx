import Image from "next/image";
import type { ReactNode } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./Features.module.css";

function OutlineIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const features = [
  {
    title: "Câmeras com IA",
    description: "Identificação de pessoas e movimentos suspeitos.",
    image: "/assets/cameras-com-ia.webp",
    alt: "Câmera de segurança Gavions com lente e LEDs infravermelhos.",
    icon: (
      <OutlineIcon>
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
        <path d="m9 14 2-5 2 5m-3.4-1.5h2.8M15 9v5" />
      </OutlineIcon>
    ),
  },
  {
    title: "Refletor potente",
    description: "Iluminação imediata que inibe a invasão.",
    image: "/assets/refletor-potente.webp",
    alt: "Refletor Gavions com painel de LEDs aceso e suporte de fixação.",
    icon: (
      <OutlineIcon>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </OutlineIcon>
    ),
  },
  {
    title: "Alarme sonoro",
    description: "Alerta de alta potência em caso de aproximação.",
    image: "/assets/alarme-sonoro.webp",
    alt: "Sirene Gavions com ondas sonoras verdes representando o alerta.",
    icon: (
      <OutlineIcon>
        <path d="M6 18v-6a6 6 0 0 1 12 0v6M4 18h16v3H4zM12 2v1M3 5l2 2m14 0 2-2M1 12h2m18 0h2M9 14v-2a3 3 0 0 1 3-3" />
      </OutlineIcon>
    ),
  },
  {
    title: "Alertas no WhatsApp",
    description: "Acompanhe tudo em tempo real, de onde estiver.",
    image: "/assets/alertas-no-whatsapp.webp",
    alt: "Celular exibindo uma notificação de detecção de pessoa no WhatsApp.",
    icon: <WhatsAppIcon />,
  },
];

export default function Features() {
  return (
    <section className={styles.features} aria-labelledby="features-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <h2 id="features-title" className={styles.title}>
            Tudo o que a <span>Gavions</span> oferece
          </h2>
          <p className={styles.subtitle}>
            Tecnologia integrada para prevenir invasões e proteger o que é seu.
          </p>
        </header>

        <ul className={styles.grid}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 1280px) 268px, (min-width: 1025px) 25vw, (min-width: 600px) 50vw, 100vw"
                  className={styles.image}
                />
                <span className={styles.icon} aria-hidden="true">
                  {feature.icon}
                </span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
