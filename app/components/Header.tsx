import WhatsAppIcon from "./WhatsAppIcon";
import Image from "next/image";
import Link from "next/link";
import mascot from "@/public/assets/gavions-logo-verde.webp";
import wordmark from "@/public/assets/gavions-nome-verde-ofc.png";
import styles from "./Header.module.css";

const whatsappMessage =
  "Olá! Conheci a Gavions pela landing page e gostaria de saber mais sobre a solução de segurança inteligente.";
const whatsappHref = `https://wa.me/5541985011909?text=${encodeURIComponent(whatsappMessage)}`;

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Gavions — página inicial">
        <Image
          className={styles.mascot}
          src={mascot}
          alt=""
          sizes="(max-width: 768px) 58px, 68px"
          loading="eager"
        />
        <Image
          className={styles.wordmark}
          src={wordmark}
          alt="Gavions"
          sizes="(max-width: 768px) 160px, 192px"
          loading="eager"
        />
      </Link>

      <a
        className={styles.contact}
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale Conosco pelo WhatsApp (abre em nova aba)"
      >
        <WhatsAppIcon className={styles.whatsappIcon} />
        <span className={styles.contactLabel}>Fale Conosco</span>
      </a>
    </header>
  );
}
