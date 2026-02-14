"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollStory(
  rootRef: RefObject<HTMLElement | null>,
  onSectionChange?: (section: string) => void
) {
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


        // Track active section for progress indicator
        const sections = [
          { id: "hero", selector: "[data-scene='hero']" },
          { id: "problem", selector: "[data-scene='pain']" },
          { id: "build", selector: "[data-scene='product']" },
          { id: "engine", selector: "[data-scene='automation']" },
          { id: "signal", selector: "[data-scene='insights']" },
          { id: "cta", selector: "[data-scene='cta']" },
        ];

        sections.forEach(({ id, selector }) => {
          ScrollTrigger.create({
            trigger: selector,
            start: "top center",
            end: "bottom center",
            onEnter: () => onSectionChange?.(id),
            onEnterBack: () => onSectionChange?.(id),
          });
        });

        // Hero word animations - single trigger, not scrubbed
        wordTargets.forEach(({ element, words }) => {
          if (!words.length) {
            return;
          }

          const inHero = element.closest("[data-scene='hero']") !== null;

          if (inHero) {
            // Hero animations play immediately on load
            gsap.from(words, {
              yPercent: 120,
              opacity: 0,
              duration: 0.9,
              stagger: 0.028,
              ease: "power3.out",
              delay: 0.2,
            });
            return;
          }

          // Other sections - animate when they enter viewport, fixed duration
          gsap.from(words, {
            yPercent: 115,
            opacity: 0,
            duration: 0.8,
            stagger: 0.022,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: isMobile ? "top 85%" : "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Rise animations - fixed duration, not scrubbed
        gsap.utils.toArray<HTMLElement>("[data-animate='rise']").forEach((item) => {
          gsap.from(item, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: isMobile ? "top 90%" : "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Visual clip-path animations
        gsap.utils.toArray<HTMLElement>("[data-animate='visual']").forEach((visual) => {
          const inHero = visual.closest("[data-scene='hero']") !== null;
          
          if (inHero) {
            gsap.from(visual, {
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              duration: 1.2,
              ease: "power3.inOut",
              delay: 0.4,
            });
          } else {
            gsap.fromTo(
              visual,
              {
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              },
              {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: visual,
                  start: isMobile ? "top 85%" : "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // Section background number parallax - continuous animation
        gsap.utils.toArray<HTMLElement>(".section-number").forEach((num) => {
          gsap.to(num, {
            y: -150,
            ease: "none",
            scrollTrigger: {
              trigger: num.closest(".story-section"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        // Section copy entrance animations
        gsap.utils.toArray<HTMLElement>(".section-copy").forEach((copy) => {
          const inHero = copy.closest("[data-scene='hero']") !== null;
          if (inHero) return;

          gsap.from(copy, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: copy,
              start: isMobile ? "top 85%" : "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Footer entrance animation
        const footer = document.querySelector(".main-footer");
        if (footer) {
          gsap.from(footer, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });

          // Footer columns staggered animation
          gsap.from(footer.querySelectorAll("[data-animate='column']"), {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          // Footer bottom bar
          gsap.from(footer.querySelector("[data-animate='bottom']"), {
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

      };

      mm.add("(max-width: 1023px)", () => {
        buildScenes(true);
      });

      mm.add("(min-width: 1024px)", () => {
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
  }, [rootRef, onSectionChange]);
}
