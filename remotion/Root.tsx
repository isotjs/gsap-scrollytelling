import { Composition } from "remotion";
import { z } from "zod";
import { StoryLoop, storyLoopSchema } from "./scenes/StoryLoop";

const fps = 30;
const width = 1280;
const height = 720;

// Base schema for all compositions
const baseSchema = z.object({
  ...storyLoopSchema.shape,
});

// Default duration for loops (8 seconds)
const defaultDuration = 240;

// Composition configurations
const compositions = [
  {
    id: "HeroLoop",
    variant: "hero" as const,
    durationInFrames: defaultDuration,
  },
  {
    id: "PainLoop",
    variant: "pain" as const,
    durationInFrames: defaultDuration,
  },
  {
    id: "ProductLoop",
    variant: "product" as const,
    durationInFrames: defaultDuration,
  },
  {
    id: "AutomationLoop",
    variant: "automation" as const,
    durationInFrames: defaultDuration,
  },
  {
    id: "InsightsLoop",
    variant: "insights" as const,
    durationInFrames: defaultDuration,
  },
];

export const RemotionRoot = () => {
  return (
    <>
      {compositions.map((comp) => (
        <Composition
          key={comp.id}
          id={comp.id}
          component={StoryLoop}
          durationInFrames={comp.durationInFrames}
          fps={fps}
          width={width}
          height={height}
          defaultProps={{
            variant: comp.variant,
            enableAudio: false,
            audioSrc: undefined,
          }}
          schema={baseSchema}
          calculateMetadata={async ({ props }) => {
            return {
              durationInFrames: comp.durationInFrames,
              fps,
              width,
              height,
              props: {
                ...props,
                variant: comp.variant,
              },
            };
          }}
        />
      ))}
    </>
  );
};
