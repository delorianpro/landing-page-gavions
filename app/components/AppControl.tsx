import Image from "next/image";
import styles from "./AppControl.module.css";

const features = [
  {
    number: "01",
    title: "Seus locais",
    description: "Gerencie diversos ambientes em um só app.",
    image: "/assets/celular-seus-locais.webp",
    alt: "Aplicativo Gavions com três locais e seus estados de proteção.",
  },
  {
    number: "02",
    title: "Visualização ao vivo",
    description: "Acompanhe as câmeras em tempo real e com alta qualidade.",
    image: "/assets/celular-vizualizacao-ao-vivowebp",
    alt: "Aplicativo Gavions mostrando a câmera de uma entrada ao vivo.",
  },
  {
    number: "03",
    title: "Alertas em tempo real",
    description:
      "Receba notificações imediatas de qualquer movimento suspeito.",
    image: "/assets/celular-alertas.webp",
    alt: "Aplicativo Gavions com notificações de movimento na garagem, no jardim e no Local 3.",
  },
];

const benefits = [
  {
    label: "Objetos monitorados",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 10v6M1 12h6m10 0h6" />
      </>
    ),
  },
  {
    label: "Áreas protegidas",
    icon: <path d="m12 2 8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5l8-3Z" />,
  },
  {
    label: "Alertas em tempo real",
    icon: (
      <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9ZM10 22h4M12 1v2" />
    ),
  },
];

export default function AppControl() {
  return (
    <section className={styles.section} aria-labelledby="app-control-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.intro}>
            <h2 id="app-control-title" className={styles.title}>
              <span>Tudo sob</span>{" "}
              <span>seu</span>{" "}
              <span>controle.</span>
            </h2>
            <span className={styles.accent} aria-hidden="true" />
            <p className={styles.description}>
              Do monitoramento à resposta, o Gavions coloca a segurança da sua
              casa na palma da sua mão.
            </p>
          </header>

          <ol className={styles.cards}>
            {features.map((feature) => (
              <li key={feature.number} className={styles.card}>
                <div className={styles.cardHeading}>
                  <span className={styles.number} aria-hidden="true">
                    {feature.number}
                  </span>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>
                    {feature.description}
                  </p>
                </div>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1122}
                  height={1402}
                  sizes="(min-width: 1280px) 245px, (min-width: 1025px) 20vw, (min-width: 600px) 26vw, (min-width: 420px) 320px, 76vw"
                  className={styles.image}
                />
              </li>
            ))}
          </ol>
        </div>

        <ul className={styles.benefits} aria-label="Benefícios do monitoramento">
          {benefits.map((benefit) => (
            <li key={benefit.label} className={styles.benefit}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {benefit.icon}
              </svg>
              <span>{benefit.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
