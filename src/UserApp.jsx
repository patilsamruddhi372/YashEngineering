import { useState, useEffect } from "react";

// USER COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Products from "./sections/Products";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";

export default function UserApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // 🔹 Active nav scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "products",
        "services",
        "clients",
        "gallery",
        "contact",
      ];

      const scrollPos = window.scrollY + 120;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Scroll on nav click
  const scrollToSection = (section) => {
    setActiveSection(section.toLowerCase());
    setIsMenuOpen(false);
    document
      .getElementById(section.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <Hero />
      <About />
      <Products />
      <Services />
      <Clients />
      <Gallery />
      <Contact />

      <Footer scrollToSection={scrollToSection} />
      <WhatsAppButton />
    </>
  );
}
