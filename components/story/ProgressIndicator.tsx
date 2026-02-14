"use client";

import { useEffect, useState } from "react";

interface ProgressIndicatorProps {
  activeSection: string;
}

const sections = [
  { id: "hero", label: "Start" },
  { id: "problem", label: "Problem" },
  { id: "build", label: "Build" },
  { id: "engine", label: "Engine" },
  { id: "signal", label: "Signal" },
  { id: "cta", label: "Launch" },
];

export function ProgressIndicator({ activeSection }: ProgressIndicatorProps) {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-scene="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="progress-indicator">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`progress-dot ${activeSection === section.id ? "active" : ""}`}
          data-label={section.label}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Go to ${section.label}`}
        />
      ))}
    </div>
  );
}
