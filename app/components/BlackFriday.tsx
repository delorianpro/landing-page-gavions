import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./BlackFriday.module.css";

const whatsappMessage =
  "Olá! Conheci a Gavions pela landing page e gostaria de saber mais sobre a oferta de Black Friday com 40% de desconto.";
const whatsappUrl = `https://wa.me/5541985011909?text=${encodeURIComponent(whatsappMessage)}`;

function Circuit({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 280"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 52h76l32 32h48l28-28h56M0 76h64l32 32h64M0 204h72l38-38h48l34 34h48M0 228h84l38-38h26M32 0v28l28 28M24 280v-28l28-28M0 140h54l28-28h30M174 0v24l34 34v38l24 24h48M170 280v-30l38-38v-40l28-28h44" />
      <g fill="currentColor" stroke="none">
        <circle cx="240" cy="56" r="3" />
        <circle cx="160" cy="108" r="3" />
        <circle cx="240" cy="200" r="3" />
        <circle cx="148" cy="190" r="3" />
        <circle cx="112" cy="112" r="3" />
        <circle cx="208" cy="96" r="2.5" />
        <circle cx="208" cy="172" r="2.5" />
      </g>
      <path d="m116 126 20-7 20 7v17c0 14-9 23-20 29-11-6-20-15-20-29Z" />
      <path d="m127 144 6 6 12-13" />
    </svg>
  );
}

export default function BlackFriday() {
  return (
    <section className={styles.section} aria-labelledby="black-friday-title">
      <div className={styles.container}>
        <div className={styles.banner}>
          <Circuit className={styles.circuitLeft} />
          <Circuit className={styles.circuitRight} />

          <p className={styles.badge}>BLACK FRIDAY</p>

          <div className={styles.content}>
            <p className={styles.eyebrow}>OFERTA POR TEMPO LIMITADO</p>
            <h2 id="black-friday-title" className={styles.offer}>
              <span className={styles.percentage}>40%</span>{" "}
              <span className={styles.discount}>DE DESCONTO</span>
            </h2>
            <a
              className={styles.whatsapp}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>Garanta sua proteção pelo WhatsApp</span>
              <span className={styles.srOnly}> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
