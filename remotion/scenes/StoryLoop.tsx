import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { CSSProperties } from "react";
import { z } from "zod";

export const storyLoopSchema = z.object({
  variant: z.enum(["hero", "pain", "product", "automation", "insights"]),
});

type StoryLoopProps = z.infer<typeof storyLoopSchema>;

const background =
  "radial-gradient(circle at 10% 10%, #fff5e7 0%, transparent 40%), radial-gradient(circle at 90% 10%, #f9cfaa 0%, transparent 42%), linear-gradient(135deg, #f8f2e7 0%, #f0dfcb 100%)";

const panel: CSSProperties = {
  border: "1px solid rgba(90, 63, 43, 0.2)",
  borderRadius: 28,
  background: "rgba(255, 251, 246, 0.82)",
  backdropFilter: "blur(10px)",
};

const looped = (frame: number, max: number) => frame % max;

const HeroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 } });
  const drift = Math.sin((frame / 240) * Math.PI * 2) * 24;

  return (
    <AbsoluteFill style={{ background }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            ...panel,
            width: 920,
            height: 500,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 999,
              position: "absolute",
              top: 40 + drift,
              left: 80,
              background:
                "radial-gradient(circle, #f5a26f 0%, #e95f2f 62%, #c4421e 100%)",
            }}
          />
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 999,
              position: "absolute",
              bottom: 50 - drift,
              right: 80,
              background:
                "radial-gradient(circle, #ffe3bf 0%, #f8ba8a 58%, #ec8f4a 100%)",
            }}
          />
          <div
            style={{
              ...panel,
              position: "absolute",
              top: 80,
              right: 110,
              padding: "16px 20px",
              transform: `translateY(${interpolate(rise, [0, 1], [20, 0])}px)`,
              opacity: rise,
            }}
          >
            <div style={{ fontSize: 16, color: "#5b4432" }}>Drop readiness</div>
            <div style={{ fontSize: 66, lineHeight: 1, fontWeight: 700 }}>98%</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PainScene = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 980, display: "grid", gap: 20 }}>
        {[
          "Design feedback blocked",
          "Inventory updates delayed",
          "Launch plan spread across tools",
        ].map((label, i) => {
          const progress = interpolate(looped(frame - i * 12, 140), [0, 120], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.quad),
          });
          return (
            <div
              key={label}
              style={{
                ...panel,
                padding: "22px 24px",
                fontSize: 34,
                transform: `translateX(${interpolate(progress, [0, 1], [90, 0])}px)`,
                opacity: progress,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ProductScene = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(looped(frame, 180), [0, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          ...panel,
          width: 950,
          height: 540,
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 300,
            height: 330,
            borderRadius: "48px 48px 64px 64px",
            border: "4px solid rgba(70, 46, 30, 0.65)",
            opacity: interpolate(progress, [0, 1], [0.2, 1]),
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 330,
            borderRadius: "48px 48px 64px 64px",
            background:
              "linear-gradient(145deg, #fff3dd 0%, #f6ca9a 42%, #ec8742 100%)",
            clipPath: `inset(0 ${interpolate(progress, [0, 1], [50, 0])}% 0 0)`,
          }}
        />
        <div
          style={{
            ...panel,
            position: "absolute",
            right: 120,
            bottom: 70,
            padding: "10px 14px",
            transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
            opacity: progress,
          }}
        >
          Best Seller Candidate
        </div>
      </div>
    </AbsoluteFill>
  );
};

const AutomationScene = () => {
  const frame = useCurrentFrame();
  const nodes = ["Storefront", "Inventory", "Print + Ship", "Customer Updates"];
  return (
    <AbsoluteFill style={{ background, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 980, display: "grid", gap: 12 }}>
        {nodes.map((node, i) => {
          const progress = interpolate(looped(frame - i * 14, 180), [0, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={node}>
              <div
                style={{
                  ...panel,
                  fontSize: 30,
                  fontWeight: 600,
                  padding: "18px 20px",
                  transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
                  opacity: progress,
                }}
              >
                {node}
              </div>
              {i < nodes.length - 1 ? (
                <div
                  style={{
                    marginTop: 8,
                    height: 4,
                    borderRadius: 999,
                    width: `${interpolate(progress, [0, 1], [0, 100])}%`,
                    background: "linear-gradient(90deg, #ee7d40, #e74a23)",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const InsightsScene = () => {
  const frame = useCurrentFrame();
  const p = interpolate(looped(frame, 200), [0, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ background, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 980, display: "grid", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div style={{ ...panel, padding: "18px 22px" }}>
            <div style={{ color: "#5e4633" }}>Repeat buyers</div>
            <div style={{ fontSize: 68, fontWeight: 700 }}>+41%</div>
          </div>
          <div style={{ ...panel, padding: "18px 22px" }}>
            <div style={{ color: "#5e4633" }}>Sell-through week 1</div>
            <div style={{ fontSize: 68, fontWeight: 700 }}>87%</div>
          </div>
        </div>
        {[0.92, 0.71, 0.84].map((target, i) => (
          <div
            key={target}
            style={{
              height: 26,
              borderRadius: 999,
              background: "rgba(95, 69, 49, 0.16)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${interpolate(p, [0, 1], [0, target * 100])}%`,
                borderRadius: "inherit",
                background: "linear-gradient(90deg, #ec7f41, #e84722)",
                transition: "width 120ms linear",
                transform: `translateX(${Math.sin((frame + i * 12) * 0.09) * 4}px)`,
              }}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const StoryLoop = ({ variant }: StoryLoopProps) => {
  if (variant === "pain") {
    return <PainScene />;
  }

  if (variant === "product") {
    return <ProductScene />;
  }

  if (variant === "automation") {
    return <AutomationScene />;
  }

  if (variant === "insights") {
    return <InsightsScene />;
  }

  return <HeroScene />;
};
