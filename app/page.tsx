import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import PartnersClients from "@/components/home/PartnersClients";
import Audiences from "@/components/home/Audiences";
import StatsBand from "@/components/home/StatsBand";
import Testimonials from "@/components/home/Testimonials";
import AiProjects from "@/components/home/AiProjects";
import FooterCta from "@/components/FooterCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <PartnersClients />
      <Audiences />
      <StatsBand />
      <Testimonials />
      <AiProjects />
      <FooterCta />
    </main>
  );
}
