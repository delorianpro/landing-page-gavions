import WhatsAppIcon from "./WhatsAppIcon";
import type { ReactNode } from "react";
import HeroVideo from "./HeroVideo";
import styles from "./Hero.module.css";

const whatsappMessage =
  "Olá! Conheci a Gavions pela landing page e gostaria de saber mais sobre a solução de segurança inteligente.";
const whatsappHref = `https://wa.me/5541985011909?text=${encodeURIComponent(whatsappMessage)}`;

type HeroProps = {
  visual?: ReactNode;
};

export default function Hero({ visual }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroVideo />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span>SEGURANÇA INTELIGENTE QUE</span>{" "}
            <span className={styles.highlight}>REAGE DE VERDADE.</span>
          </h1>

          <p className={styles.description}>
            A Inteligência Artificial da Gavions detecta, o refletor acende, a
            sirene dispara e você recebe o alerta no WhatsApp. Não basta assistir,
            é preciso agir.
          </p>

          <a
            className={styles.contact}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale no WhatsApp (abre em nova aba)"
          >
            <WhatsAppIcon className={styles.whatsappIcon} />
            Fale no WhatsApp
          </a>

          <p className={styles.offer}>
            Oferta de Lançamento: <strong>40% de desconto</strong>
          </p>
        </div>

        {visual ? <div className={styles.visual}>{visual}</div> : null}
      </div>
    </section>
  );
}
