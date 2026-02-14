"use client";

import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/story/Navigation";
import { CTASection } from "@/components/story/CTASection";
import { Footer } from "@/components/story/Footer";
import { StorySection } from "@/components/story/StorySection";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import {
  AutomationVisual,
  HeroVisual,
  InsightsVisual,
  PainVisual,
  ProductVisual,
} from "@/components/story/StoryVisuals";
import { useScrollStory } from "@/hooks/useScrollStory";
import { storyScenes } from "@/lib/story-data";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  useScrollStory(rootRef, setActiveSection);

  return (
    <div className="story-page" ref={rootRef}>
      <Navigation />
      <ProgressIndicator activeSection={activeSection} />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section" data-scene="hero">
          <div className="hero-bg" />
          
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-eyebrow" data-animate="words">
                ThreadPilot for Apparel Teams
              </p>
              <h1 className="hero-title" data-animate="words">
                <span className="hero-title-line">Scroll from</span>
                <span className="hero-title-line">idea to</span>
                <span className="hero-title-line hero-title-accent">sold-out.</span>
              </h1>
              <p className="hero-subtitle" data-animate="words">
                Design, automate, and scale every release from one operating
                system built for modern merch brands.
              </p>
              <div className="hero-cta">
                <button type="button" className="btn-primary" data-animate="rise">
                  Start Building
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  data-animate="rise"
                >
                  See Live Walkthrough
                </button>
              </div>
            </div>
            
            <div className="hero-visual-wrapper">
              <div className="hero-visual" data-animate="visual">
                <HeroVisual />
              </div>
            </div>
          </div>
          
          <div className="hero-section-number">01</div>
          
          <div className="scroll-indicator">
            <span>Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path
                d="M8 2V22M8 22L2 16M8 22L14 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Story Sections */}
        <StorySection scene={storyScenes[0]} number="02">
          <PainVisual />
        </StorySection>

        <StorySection scene={storyScenes[1]} number="03">
          <ProductVisual />
        </StorySection>

        <StorySection scene={storyScenes[2]} number="04">
          <AutomationVisual />
        </StorySection>

        <StorySection scene={storyScenes[3]} number="05">
          <InsightsVisual />
        </StorySection>

        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
