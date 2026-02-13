import { StoryScene } from "@/lib/story-data";
import { ReactNode } from "react";

type StorySectionProps = {
  scene: StoryScene;
  children: ReactNode;
};

export function StorySection({ scene, children }: StorySectionProps) {
  return (
    <section className="story-section" data-scene={scene.id}>
      <div className="section-inner">
        <div className="section-copy">
          <p className="section-eyebrow" data-animate="words">
            {scene.eyebrow}
          </p>
          <h2 data-animate="words">{scene.title}</h2>
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
        <div className="section-visual">{children}</div>
      </div>
    </section>
  );
}
