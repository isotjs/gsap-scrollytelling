"use client";

import { useRef } from "react";
import { CTASection } from "@/components/story/CTASection";
import { StorySection } from "@/components/story/StorySection";
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
  useScrollStory(rootRef);

  return (
    <div className="story-page" ref={rootRef}>
      <main>
        <section className="hero-section" data-scene="hook">
          <div className="hero-pin">
            <p className="hero-kicker" data-animate="words">
              ThreadPilot for Apparel Teams
            </p>
            <h1 className="hero-title" data-animate="words">
              Scroll from idea to sold-out t-shirt drop.
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
          <HeroVisual />
        </section>

        <StorySection scene={storyScenes[0]}>
          <PainVisual />
        </StorySection>

        <StorySection scene={storyScenes[1]}>
          <ProductVisual />
        </StorySection>

        <StorySection scene={storyScenes[2]}>
          <AutomationVisual />
        </StorySection>

        <StorySection scene={storyScenes[3]}>
          <InsightsVisual />
        </StorySection>

        <CTASection />
      </main>
    </div>
  );
}
