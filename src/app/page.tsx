import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import PromoNewsletter from "@/components/PromoNewsletter";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <About />
        <Testimonials />
        <PromoNewsletter />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
