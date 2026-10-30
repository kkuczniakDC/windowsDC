import { getImageProps } from "next/image";
import Link from "next/link";

import desktopHero from "../../../assets/sliding-door-dark-unsplash.jpg";
import mobileHero from "../../../assets/yael-yanez-Uuz7lCQWpyo-unsplash.jpg";
import { homeSectionEffectProps } from "@/components/motion/home-section-effects";
import { routes } from "@/lib/brand";
import styles from "./Hero.module.css";

const heroAlt =
  "A modern glazed pavilion at dusk, with warm interior light reflected on rain-dark paving";

export function Hero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: desktopHero,
    alt: heroAlt,
    sizes: "(min-width: 1440px) 58vw, (min-width: 768px) 62vw, 100vw",
    quality: 75,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    src: mobileHero,
    alt: heroAlt,
    sizes: "(max-width: 767px) 100vw, 62vw",
    quality: 75,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      {...homeSectionEffectProps("hero")}
    >
      <div className={styles.copy}>
        <p className="eyebrow">Architectural windows · doors · glazing</p>
        <h1 id="hero-title">
          <span>Frame the way</span>
          <span>light lives.</span>
        </h1>
        <p className={styles.intro}>
          High-performance systems for homes and buildings where proportion,
          comfort and detail are inseparable.
        </p>
        <div className={styles.actions}>
          <Link className="button button-primary" href={routes.consultation}>
            Book a project consultation
          </Link>
          <Link className="text-link" href="#systems">
            Explore the systems
          </Link>
        </div>
      </div>

      <figure className={styles.visual}>
        <picture>
          <source
            media="(min-width: 768px)"
            sizes="(min-width: 1440px) 58vw, 62vw"
            srcSet={desktopSrcSet}
          />
          <source
            media="(max-width: 767px)"
            sizes="100vw"
            srcSet={mobileSrcSet}
          />
          <img
            {...mobileProps}
            alt={heroAlt}
            className={styles.image}
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        <figcaption className={styles.caption}>
          <span>Atmosphere study 01</span>
          Rain · reflection · warm interior
        </figcaption>
      </figure>

    </section>
  );
}
