import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
} from "remotion";
import { LightLeak } from "@remotion/light-leaks";
import type { CSSProperties } from "react";
import { z } from "zod";

export const storyLoopSchema = z.object({
  variant: z.enum(["hero", "pain", "product", "automation", "insights"]),
  enableAudio: z.boolean().optional().default(false),
  audioSrc: z.string().optional(),
});

type StoryLoopProps = z.infer<typeof storyLoopSchema>;

// New Color Palette: Crayola & Champagne Pink
const colors = {
  crayola: "#273B3A",
  champagne: "#E6D4C7",
  champagneDark: "#DBC7B8",
  accent: "#3D5A58",
  text: "#273B3A",
  textLight: "#5C7573",
  gradientOrange: ["#f5a26f", "#e95f2f", "#c4421e"],
  gradientPeach: ["#ffe3bf", "#f8ba8a", "#ec8f4a"],
};

const background = `
  radial-gradient(circle at 10% 10%, ${colors.champagne} 0%, transparent 45%),
  radial-gradient(circle at 90% 10%, ${colors.champagneDark} 0%, transparent 48%),
  radial-gradient(circle at 50% 50%, ${colors.champagne} 0%, ${colors.champagneDark} 100%)
`;

const panel: CSSProperties = {
  border: `1px solid ${colors.crayola}20`,
  borderRadius: 28,
  background: `${colors.champagne}d0`,
  backdropFilter: "blur(12px)",
  boxShadow: `0 8px 32px ${colors.crayola}15`,
};

const looped = (frame: number, max: number) => frame % max;

// Kinetic Typography Component
const AnimatedText = ({
  text,
  frame,
  startFrame = 0,
  style = {},
}: {
  text: string;
  frame: number;
  startFrame?: number;
  style?: CSSProperties;
}) => {
  const letters = text.split("");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
      {letters.map((letter, i) => {
        const delay = i * 2;
        const letterProgress = interpolate(
          frame - startFrame - delay,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const springValue = spring({
          frame: frame - startFrame - delay,
          fps: 30,
          config: { damping: 15, stiffness: 100 },
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${interpolate(letterProgress, [0, 1], [30, 0])}px)`,
              opacity: springValue,
              transition: "opacity 0.1s",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </span>
  );
};

// Seeded random number generator for deterministic particles
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Particle Effect Component
const Particles = ({ count = 20, frame }: { count?: number; frame: number }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1) * 100,
    y: seededRandom(i * 2) * 100,
    size: seededRandom(i * 3) * 4 + 2,
    speed: seededRandom(i * 4) * 0.5 + 0.2,
    delay: seededRandom(i * 5) * 60,
  }));

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => {
        const y = (p.y + (frame * p.speed + p.delay) * 0.1) % 100;
        const opacity = interpolate(
          Math.sin((frame + p.delay) * 0.05),
          [-1, 1],
          [0.2, 0.6]
        );

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: colors.crayola,
              opacity,
              transform: `scale(${interpolate(
                Math.sin((frame + p.delay) * 0.1),
                [-1, 1],
                [0.5, 1]
              )})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const HeroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200 } });
  const drift = Math.sin((frame / 240) * Math.PI * 2) * 24;
  const pulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill style={{ background }}>
      {/* Light Leaks Effect */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.3, mixBlendMode: "soft-light" }}>
        <LightLeak durationInFrames={240} seed={1} hueShift={0} />
      </div>

      {/* Particles */}
      <Particles frame={frame} count={15} />

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
          {/* Animated Gradient Circle 1 */}
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 999,
              position: "absolute",
              top: 40 + drift,
              left: 80,
              background: `radial-gradient(circle, ${colors.gradientOrange[0]} 0%, ${colors.gradientOrange[1]} 62%, ${colors.gradientOrange[2]} 100%)`,
              transform: `scale(${pulse})`,
              opacity: interpolate(frame, [0, 30], [0, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          />

          {/* Animated Gradient Circle 2 */}
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 999,
              position: "absolute",
              bottom: 50 - drift,
              right: 80,
              background: `radial-gradient(circle, ${colors.gradientPeach[0]} 0%, ${colors.gradientPeach[1]} 58%, ${colors.gradientPeach[2]} 100%)`,
              transform: `scale(${interpolate(Math.sin(frame * 0.06), [-1, 1], [0.95, 1.05])})`,
              opacity: interpolate(frame, [10, 40], [0, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          />

          {/* Status Card with Kinetic Typography */}
          <div
            style={{
              ...panel,
              position: "absolute",
              top: 80,
              right: 110,
              padding: "18px 24px",
              transform: `translateY(${interpolate(rise, [0, 1], [30, 0])}px)`,
              opacity: rise,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: colors.textLight,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              <AnimatedText text="Drop readiness" frame={frame} startFrame={20} />
            </div>
            <div
              style={{
                fontSize: 72,
                lineHeight: 1,
                fontWeight: 800,
                color: colors.text,
              }}
            >
              <AnimatedText text="98%" frame={frame} startFrame={40} />
            </div>
          </div>

          {/* Floating Label */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 60,
              padding: "10px 16px",
              background: colors.crayola,
              color: colors.champagne,
              borderRadius: 20,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transform: `translateX(${interpolate(frame, [30, 60], [-50, 0])}px)`,
              opacity: interpolate(frame, [30, 60], [0, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          >
            ThreadPilot
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PainScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const painPoints = [
    { text: "Design feedback blocked", icon: "✕" },
    { text: "Inventory updates delayed", icon: "⚠" },
    { text: "Launch plan spread across tools", icon: "◎" },
  ];

  return (
    <AbsoluteFill style={{ background }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.25, mixBlendMode: "overlay" }}>
        <LightLeak durationInFrames={240} seed={2} hueShift={10} />
      </div>
      <Particles frame={frame} count={10} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 980, display: "grid", gap: 20 }}>
          {painPoints.map((item, i) => {
            const progress = interpolate(
              looped(frame - i * 15, 140),
              [0, 100],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

            const springProgress = spring({
              frame: frame - i * 15,
              fps,
              config: { damping: 20, stiffness: 100 },
            });

            return (
              <div
                key={item.text}
                style={{
                  ...panel,
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px) scale(${interpolate(springProgress, [0, 1], [0.9, 1])})`,
                  opacity: progress,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    color: colors.crayola,
                    opacity: 0.6,
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontSize: 32,
                    color: colors.text,
                    fontWeight: 600,
                  }}
                >
                  <AnimatedText text={item.text} frame={frame} startFrame={i * 15} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 14,
            color: colors.textLight,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            opacity: interpolate(frame, [60, 90], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          Before ThreadPilot
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ProductScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(looped(frame, 180), [0, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const springProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ background }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.2, mixBlendMode: "soft-light" }}>
        <LightLeak durationInFrames={240} seed={3} hueShift={20} />
      </div>
      <Particles frame={frame} count={12} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
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
          {/* T-shirt outline with glow effect */}
          <div
            style={{
              width: 300,
              height: 330,
              borderRadius: "48px 48px 64px 64px",
              border: `4px solid ${colors.crayola}60`,
              opacity: interpolate(progress, [0, 1], [0.3, 1]),
              boxShadow: `0 0 60px ${colors.crayola}20`,
              transform: `scale(${interpolate(springProgress, [0, 1], [0.8, 1])})`,
            }}
          />

          {/* Gradient fill reveal */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 330,
              borderRadius: "48px 48px 64px 64px",
              background: `linear-gradient(145deg, ${colors.gradientPeach[0]} 0%, ${colors.gradientPeach[1]} 42%, ${colors.gradientPeach[2]} 100%)`,
              clipPath: `inset(0 ${interpolate(progress, [0, 1], [50, 0])}% 0 0)`,
              transform: `scale(${interpolate(springProgress, [0, 1], [0.8, 1])})`,
            }}
          />

          {/* Badge */}
          <div
            style={{
              ...panel,
              position: "absolute",
              right: 120,
              bottom: 80,
              padding: "12px 18px",
              transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
              opacity: progress,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.text,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <AnimatedText text="Best Seller Candidate" frame={frame} startFrame={60} />
            </span>
          </div>

          {/* Size indicator */}
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 100,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: interpolate(frame, [80, 110], [0, 1], {
                extrapolateLeft: "clamp",
              }),
            }}
          >
            {["S", "M", "L", "XL"].map((size, i) => (
              <div
                key={size}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `2px solid ${colors.crayola}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.textLight,
                  background:
                    size === "M" ? `${colors.crayola}20` : "transparent",
                  transform: `translateX(${interpolate(frame - 80 - i * 5, [0, 20], [-20, 0])}px)`,
                  opacity: interpolate(frame - 80 - i * 5, [0, 20], [0, 1], {
                    extrapolateLeft: "clamp",
                  }),
                }}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const AutomationScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodes = [
    { text: "Storefront", icon: "🛒" },
    { text: "Inventory", icon: "📦" },
    { text: "Print + Ship", icon: "🖨" },
    { text: "Customer Updates", icon: "✉" },
  ];

  return (
    <AbsoluteFill style={{ background }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.25, mixBlendMode: "overlay" }}>
        <LightLeak durationInFrames={240} seed={4} hueShift={30} />
      </div>
      <Particles frame={frame} count={8} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 980, display: "grid", gap: 12 }}>
          {nodes.map((node, i) => {
            const progress = interpolate(
              looped(frame - i * 12, 180),
              [0, 100],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const springProgress = spring({
              frame: frame - i * 12,
              fps,
              config: { damping: 18, stiffness: 120 },
            });

            return (
              <div key={node.text}>
                <div
                  style={{
                    ...panel,
                    fontSize: 28,
                    fontWeight: 600,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px) scale(${interpolate(springProgress, [0, 1], [0.95, 1])})`,
                    opacity: progress,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{node.icon}</span>
                  <span style={{ color: colors.text }}>
                    <AnimatedText text={node.text} frame={frame} startFrame={i * 12} />
                  </span>
                </div>

                {i < nodes.length - 1 ? (
                  <div
                    style={{
                      marginTop: 8,
                      marginLeft: 20,
                      height: 4,
                      borderRadius: 999,
                      width: `${interpolate(progress, [0, 1], [0, 100])}%`,
                      background: `linear-gradient(90deg, ${colors.gradientOrange[0]}, ${colors.gradientOrange[1]})`,
                      opacity: interpolate(progress, [0, 0.5, 1], [0, 0.5, 1]),
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Status label */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            padding: "10px 18px",
            background: `${colors.crayola}15`,
            borderRadius: 20,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: colors.textLight,
            opacity: interpolate(frame, [80, 110], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          Automated Flow
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const InsightsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = interpolate(looped(frame, 200), [0, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const springProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ background }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.3, mixBlendMode: "soft-light" }}>
        <LightLeak durationInFrames={240} seed={5} hueShift={40} />
      </div>
      <Particles frame={frame} count={10} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 980, display: "grid", gap: 18 }}>
          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            {[
              { label: "Repeat buyers", value: "+41%" },
              { label: "Sell-through week 1", value: "87%" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  ...panel,
                  padding: "24px 28px",
                  transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px) scale(${interpolate(springProgress, [0, 1], [0.9, 1])})`,
                  opacity: interpolate(frame - i * 10, [0, 30], [0, 1], {
                    extrapolateLeft: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    color: colors.textLight,
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  <AnimatedText text={stat.label} frame={frame} startFrame={i * 10} />
                </div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    color: colors.text,
                  }}
                >
                  <AnimatedText text={stat.value} frame={frame} startFrame={i * 10 + 15} />
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bars */}
          {[0.92, 0.71, 0.84].map((target, i) => (
            <div
              key={target}
              style={{
                height: 32,
                borderRadius: 999,
                background: `${colors.crayola}15`,
                overflow: "hidden",
                padding: 4,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(p, [0, 1], [0, target * 100])}%`,
                  borderRadius: "inherit",
                  background: `linear-gradient(90deg, ${colors.gradientOrange[0]}, ${colors.gradientOrange[1]})`,
                  transform: `translateX(${Math.sin((frame + i * 12) * 0.09) * 2}px)`,
                  opacity: interpolate(frame - i * 8, [0, 20], [0, 1], {
                    extrapolateLeft: "clamp",
                  }),
                }}
              />
            </div>
          ))}
        </div>

        {/* Insights label */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 14,
            color: colors.textLight,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            opacity: interpolate(frame, [100, 130], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          Data-Driven Decisions
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const StoryLoop = ({ variant, enableAudio, audioSrc }: StoryLoopProps) => {
  const renderScene = () => {
    switch (variant) {
      case "pain":
        return <PainScene />;
      case "product":
        return <ProductScene />;
      case "automation":
        return <AutomationScene />;
      case "insights":
        return <InsightsScene />;
      default:
        return <HeroScene />;
    }
  };

  return (
    <AbsoluteFill>
      {renderScene()}

      {/* Audio placeholder - uncomment when audio files are available */}
      {/* {enableAudio && audioSrc && (
        <Sequence from={0}>
          <Audio src={staticFile(audioSrc)} />
        </Sequence>
      )} */}
    </AbsoluteFill>
  );
};
