"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollStory(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      root.dataset.motion = "reduced";
      return;
    }

    const textRestoreCallbacks: Array<() => void> = [];

    const wordTargets = gsap
      .utils
      .toArray<HTMLElement>("[data-animate='words']", root)
      .map((element) => {
        if (element.dataset.wordsSplit === "1") {
          return {
            element,
            words: Array.from(element.querySelectorAll<HTMLElement>(".text-word")),
          };
        }

        if (element.childElementCount > 0) {
          return {
            element,
            words: Array.from(element.querySelectorAll<HTMLElement>(".text-word")),
          };
        }

        const sourceText = element.textContent ?? "";
        if (!sourceText.trim()) {
          return {
            element,
            words: [] as HTMLElement[],
          };
        }

        const fragment = document.createDocumentFragment();
        sourceText.split(/(\s+)/).forEach((token) => {
          if (token.trim().length === 0) {
            fragment.appendChild(document.createTextNode(token));
            return;
          }

          const word = document.createElement("span");
          word.className = "text-word";
          word.textContent = token;
          fragment.appendChild(word);
        });

        element.textContent = "";
        element.appendChild(fragment);
        element.dataset.wordsSplit = "1";

        textRestoreCallbacks.push(() => {
          element.textContent = sourceText;
          delete element.dataset.wordsSplit;
        });

        return {
          element,
          words: Array.from(element.querySelectorAll<HTMLElement>(".text-word")),
        };
      });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const buildScenes = (isMobile: boolean) => {
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: "[data-scene='hook']",
            start: "top top",
            end: "+=90%",
            pin: ".hero-pin",
            scrub: true,
          });
        }

        wordTargets.forEach(({ element, words }) => {
          if (!words.length) {
            return;
          }

          const inHero = element.closest("[data-scene='hook']") !== null;

          if (inHero) {
            gsap.from(words, {
              yPercent: 120,
              opacity: 0,
              duration: 0.9,
              stagger: 0.028,
              ease: "power3.out",
            });
            return;
          }

          gsap.from(words, {
            yPercent: 115,
            opacity: 0,
            stagger: 0.022,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: isMobile ? "top 88%" : "top 78%",
              end: "bottom 44%",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-animate='rise']").forEach((item) => {
          gsap.from(item, {
            y: 16,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: isMobile ? "top 94%" : "top 84%",
              end: "bottom 55%",
              scrub: true,
            },
          });
        });

        gsap.to("[data-scene='hook'] .scene-loop", {
          yPercent: -8,
          rotate: -1.2,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-scene='hook']",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils
          .toArray<HTMLElement>(".story-section[data-scene]:not([data-scene='cta'])")
          .forEach((section) => {
            const copy = section.querySelector(".section-copy");
            const visual = section.querySelector(".section-visual");

            if (copy) {
              gsap.from(copy, {
                y: 34,
                opacity: 0,
                scrollTrigger: {
                  trigger: section,
                  start: isMobile ? "top 86%" : "top 72%",
                  end: "bottom 45%",
                  scrub: true,
                },
              });
            }

            if (visual) {
              gsap.fromTo(
                visual,
                {
                  y: 40,
                  opacity: 0.25,
                  scale: 0.96,
                },
                {
                  y: -16,
                  opacity: 1,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: isMobile ? "top 88%" : "top 72%",
                    end: "bottom 40%",
                    scrub: true,
                  },
                },
              );
            }
          });

        gsap.from(".hero-section .scene-loop", {
          y: 28,
          scrollTrigger: {
            trigger: "[data-scene='hook']",
            start: isMobile ? "top 88%" : "top 72%",
            end: "bottom 38%",
            scrub: true,
          },
        });

        gsap.from(".cta-panel", {
          y: 36,
          opacity: 0,
          scrollTrigger: {
            trigger: "[data-scene='cta']",
            start: isMobile ? "top 88%" : "top 72%",
            end: "bottom 45%",
            scrub: true,
          },
        });
      };

      mm.add("(max-width: 767px)", () => {
        buildScenes(true);
      });

      mm.add("(min-width: 768px)", () => {
        buildScenes(false);
      });

      return () => {
        mm.revert();
      };
    }, root);

    return () => {
      textRestoreCallbacks.forEach((restore) => restore());
      ctx.revert();
    };
  }, [rootRef]);
}
