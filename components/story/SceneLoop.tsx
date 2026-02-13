"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SceneLoopProps = {
  label: string;
  mp4Src: string;
  posterSrc: string;
};

export function SceneLoop({ label, mp4Src, posterSrc }: SceneLoopProps) {
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
    };

    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="scene-loop">
      {!videoUnavailable && !reducedMotion ? (
        <video
          className="scene-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={() => setVideoUnavailable(true)}
          aria-label={label}
        >
          <source src={mp4Src} type="video/mp4" />
        </video>
      ) : null}
      <Image
        className="scene-poster"
        src={posterSrc}
        alt={label}
        width={1280}
        height={720}
        style={{ display: videoUnavailable || reducedMotion ? "block" : "none" }}
      />
    </div>
  );
}
