import { SceneLoop } from "./SceneLoop";

export function HeroVisual() {
  return (
    <SceneLoop
      label="ThreadPilot hero ambient visual"
      mp4Src="/visuals/hero-loop.mp4"
      posterSrc="/visuals/hero-poster.svg"
    />
  );
}

export function PainVisual() {
  return (
    <SceneLoop
      label="Operational pain montage"
      mp4Src="/visuals/pain-loop.mp4"
      posterSrc="/visuals/pain-poster.svg"
    />
  );
}

export function ProductVisual() {
  return (
    <SceneLoop
      label="T-shirt builder reveal"
      mp4Src="/visuals/product-loop.mp4"
      posterSrc="/visuals/product-poster.svg"
    />
  );
}

export function AutomationVisual() {
  return (
    <SceneLoop
      label="Fulfillment automation pipeline"
      mp4Src="/visuals/automation-loop.mp4"
      posterSrc="/visuals/automation-poster.svg"
    />
  );
}

export function InsightsVisual() {
  return (
    <SceneLoop
      label="Live insights dashboards"
      mp4Src="/visuals/insights-loop.mp4"
      posterSrc="/visuals/insights-poster.svg"
    />
  );
}
