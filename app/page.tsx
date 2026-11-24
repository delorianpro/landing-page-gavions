import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroSequence from "./components/HeroSequence";
import Features from "./components/Features";
import AppControl from "./components/AppControl";
import BlackFriday from "./components/BlackFriday";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero visual={<HeroSequence />} />
        <Features />
        <AppControl />
        <BlackFriday />
      </main>
    </>
  );
}
