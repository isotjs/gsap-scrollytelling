import { StoryScene } from "@/lib/story-data";
import { ReactNode } from "react";

type StorySectionProps = {
  scene: StoryScene;
  children: ReactNode;
  number: string;
};

export function StorySection({ scene, children, number }: StorySectionProps) {
  return (
    <section className="story-section" data-scene={scene.id}>
      <div className="section-inner">
        <div className="section-copy">
          <span className="section-number">{number}</span>
          <p className="section-eyebrow" data-animate="words">
            {scene.eyebrow}
          </p>
          <h2 className="section-title" data-animate="words">{scene.title}</h2>
          <p className="section-description" data-animate="words">
            {scene.description}
          </p>
          <ul className="section-bullets">
            {scene.bullets.map((bullet) => (
              <li key={bullet} data-animate="words">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="section-visual" data-animate="visual">
          {children}
        </div>
      </div>
    </section>
  );
}
