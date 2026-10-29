"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import lineImage from "../../../assets/de-vontez-cox-obHGJUwzJsA-unsplash.jpg";
import heightImage from "../../../assets/ben-ashby-0jUEk_11na8-unsplash.jpg";
import horizonImage from "../../../assets/sunset-window-unsplash.jpg";
import styles from "./SignatureSequence.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Scene = {
  index: string;
  direction: string;
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
  imageClassName: string;
  sceneKey: string;
};

const scenes: Scene[] = [
  {
    index: "01",
    direction: "Line",
    title: "Precision begins with the frame.",
    body: "Profiles align, junctions quieten and the elevation finds its rhythm.",
    image: lineImage,
    alt: "A precise grid of dark framed windows reflecting the evening sky",
    imageClassName: styles.lineImage,
    sceneKey: "line",
  },
  {
    index: "02",
    direction: "Height",
    title: "Daylight should travel through the whole room.",
    body: "Tall openings connect floor, canopy and changing sky.",
    image: heightImage,
    alt: "A double-height timber-framed window opening toward a woodland landscape",
    imageClassName: styles.heightImage,
    sceneKey: "height",
  },
  {
    index: "03",
    direction: "Horizon",
    title: "The best view is the one the frame does not interrupt.",
    body: "Wide spans turn boundaries into measured transitions.",
    image: horizonImage,
    alt: "A broad grid of windows framing an ocean horizon at sunset",
    imageClassName: styles.horizonImage,
    sceneKey: "horizon",
  },
];

export function SignatureSequence() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;

      if (!element) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1100px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          element.dataset.enhanced = "true";

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: "[data-sequence-stage]",
              start: "top top",
              end: "+=280%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to("[data-line-media]", {
              xPercent: -9,
              duration: 0.9,
            })
            .to(
              "[data-line-scene]",
              {
                opacity: 0.26,
                xPercent: -8,
                duration: 0.22,
              },
              0.78,
            )
            .to(
              "[data-line-scene] [data-scene-copy]",
              {
                opacity: 0,
                duration: 0.16,
              },
              0.76,
            )
            .fromTo(
              "[data-height-scene]",
              {
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
              },
              {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.55,
              },
              0.78,
            )
            .fromTo(
              "[data-height-media]",
              { yPercent: 8 },
              { yPercent: -8, duration: 0.72 },
              0.86,
            )
            .to(
              "[data-height-scene]",
              {
                opacity: 0.26,
                yPercent: -5,
                duration: 0.22,
              },
              1.47,
            )
            .to(
              "[data-height-scene] [data-scene-copy]",
              {
                opacity: 0,
                duration: 0.16,
              },
              1.45,
            )
            .fromTo(
              "[data-horizon-scene]",
              {
                opacity: 0,
                clipPath: "inset(0% 100% 0% 0%)",
              },
              {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.62,
              },
              1.47,
            )
            .fromTo(
              "[data-horizon-media]",
              { xPercent: 7 },
              { xPercent: -3, duration: 0.7 },
              1.5,
            )
            .to({}, { duration: 0.18 });

          return () => {
            delete element.dataset.enhanced;
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      className={styles.sequence}
      id="approach"
      ref={root}
      aria-labelledby="sequence-title"
    >
      <header className={styles.intro}>
        <p className="eyebrow">03 / Three movements</p>
        <h2 id="sequence-title">From line to height to horizon.</h2>
        <p>
          One architectural language, calibrated across the directions in
          which a building meets light.
        </p>
      </header>

      <div className={styles.stage} data-sequence-stage>
        <div className={styles.scenes}>
          {scenes.map((scene) => (
            <article
              className={styles.scene}
              data-line-scene={scene.sceneKey === "line" || undefined}
              data-height-scene={scene.sceneKey === "height" || undefined}
              data-horizon-scene={scene.sceneKey === "horizon" || undefined}
              key={scene.sceneKey}
            >
              <div className={styles.mediaFrame}>
                <div
                  className={styles.media}
                  data-line-media={scene.sceneKey === "line" || undefined}
                  data-height-media={scene.sceneKey === "height" || undefined}
                  data-horizon-media={scene.sceneKey === "horizon" || undefined}
                >
                  <Image
                    className={`${styles.image} ${scene.imageClassName}`}
                    src={scene.image}
                    alt={scene.alt}
                    fill
                    sizes="(min-width: 1100px) 58vw, (min-width: 768px) 63vw, 100vw"
                  />
                </div>
              </div>
              <div className={styles.sceneCopy} data-scene-copy>
                <p className={styles.sceneIndex}>{scene.index}</p>
                <p className={styles.direction}>{scene.direction}</p>
                <h3>{scene.title}</h3>
                <p className={styles.body}>{scene.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
