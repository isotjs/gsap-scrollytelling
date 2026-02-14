"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-scene="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`main-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        Thread<span>Pilot</span>
      </div>
      
      <div className="nav-links">
        <button 
          type="button" 
          className="nav-link"
          onClick={() => scrollToSection("problem")}
        >
          Problem
        </button>
        <button 
          type="button" 
          className="nav-link"
          onClick={() => scrollToSection("build")}
        >
          Build
        </button>
        <button 
          type="button" 
          className="nav-link"
          onClick={() => scrollToSection("engine")}
        >
          Engine
        </button>
        <button 
          type="button" 
          className="nav-link"
          onClick={() => scrollToSection("signal")}
        >
          Signal
        </button>
        <button 
          type="button" 
          className="nav-cta"
          onClick={() => scrollToSection("cta")}
        >
          Start Trial
        </button>
      </div>
    </nav>
  );
}
