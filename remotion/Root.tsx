import { Composition } from "remotion";
import { z } from "zod";
import { StoryLoop, storyLoopSchema } from "./scenes/StoryLoop";

const fps = 30;
const durationInFrames = 240;
const width = 1280;
const height = 720;

const baseSchema = z.object({
  ...storyLoopSchema.shape,
});

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HeroLoop"
        component={StoryLoop}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "hero" }}
        schema={baseSchema}
      />
      <Composition
        id="PainLoop"
        component={StoryLoop}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "pain" }}
        schema={baseSchema}
      />
      <Composition
        id="ProductLoop"
        component={StoryLoop}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "product" }}
        schema={baseSchema}
      />
      <Composition
        id="AutomationLoop"
        component={StoryLoop}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "automation" }}
        schema={baseSchema}
      />
      <Composition
        id="InsightsLoop"
        component={StoryLoop}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "insights" }}
        schema={baseSchema}
      />
    </>
  );
};
