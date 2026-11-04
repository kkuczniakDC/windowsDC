import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { routes } from "@/lib/brand";
import type { CategoryContent } from "@/lib/content";

import styles from "./EditorialPage.module.css";

export type EditorialFigure = {
  src: StaticImageData;
  alt: string;
  caption: string;
  objectPosition?: string;
};

export type EditorialProcessStep = {
  index: string;
  title: string;
  body: string;
};

export type EditorialPageSections = {
  thesisEyebrow: string;
  thesisTitle: string;
  thesisParagraphs: readonly string[];
  systemsEyebrow?: string;
  systemsTitle?: string;
  honesty?: {
    label: string;
    text: string;
  };
  process?: {
    eyebrow: string;
    title: string;
    intro?: string;
    steps: readonly EditorialProcessStep[];
  };
  brief?: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    buttonText: string;
    secondaryLink?: {
      href: string;
      label: string;
    };
  };
};

export type EditorialPageProps = {
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  sections: EditorialPageSections;
  figure?: EditorialFigure;
  categories?: CategoryContent[];
};

export function EditorialPage({
  eyebrow,
  heroTitle,
  heroLede,
  sections,
  figure,
  categories,
}: EditorialPageProps) {
  const showSystems =
    categories &&
    categories.length > 0 &&
    sections.systemsEyebrow &&
    sections.systemsTitle;

  return (
    <main className={styles.main} id="main-content">
      <header className={styles.intro}>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heroTitle}</h1>
        <p>{heroLede}</p>
      </header>

      <section className={styles.thesis} aria-labelledby="editorial-thesis-title">
        <p className="eyebrow">{sections.thesisEyebrow}</p>
        <h2 id="editorial-thesis-title">{sections.thesisTitle}</h2>
        <div className={styles.thesisBody}>
          {sections.thesisParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {figure ? (
        <figure className={styles.figure}>
          <div className={styles.figureFrame}>
            <Image
              src={figure.src}
              alt={figure.alt}
              fill
              sizes="(min-width: 1200px) 66vw, 100vw"
              className={styles.figureImage}
              style={
                figure.objectPosition
                  ? { objectPosition: figure.objectPosition }
                  : undefined
              }
            />
            <div className={styles.figureScrim} aria-hidden="true" />
            <figcaption>{figure.caption}</figcaption>
          </div>
        </figure>
      ) : null}

      {sections.honesty ? (
        <aside className={styles.honesty}>
          <span>{sections.honesty.label}</span>
          <p>{sections.honesty.text}</p>
        </aside>
      ) : null}

      {sections.process ? (
        <section
          className={styles.processSection}
          aria-labelledby="editorial-process-title"
        >
          <header className={styles.sectionHeader}>
            <p className="eyebrow">{sections.process.eyebrow}</p>
            <h2 id="editorial-process-title">{sections.process.title}</h2>
            {sections.process.intro ? <p>{sections.process.intro}</p> : null}
          </header>
          <ol className={styles.process}>
            {sections.process.steps.map((step) => (
              <li key={step.index}>
                <span>{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {sections.brief ? (
        <section className={styles.brief} aria-labelledby="editorial-brief-title">
          <p className="eyebrow">{sections.brief.eyebrow}</p>
          <h2 id="editorial-brief-title">{sections.brief.title}</h2>
          <ol className={styles.briefList}>
            {sections.brief.paragraphs.map((paragraph, index) => (
              <li key={paragraph.slice(0, 48)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {showSystems ? (
        <section
          className={styles.systems}
          aria-labelledby="editorial-systems-title"
        >
          <header className={styles.sectionHeader}>
            <p className="eyebrow">{sections.systemsEyebrow}</p>
            <h2 id="editorial-systems-title">{sections.systemsTitle}</h2>
          </header>
          <ol className={styles.systemList}>
            {categories.map((category, index) => (
              <li key={category.id}>
                <Link href={category.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.navSummary}</p>
                  </div>
                  <span className={styles.systemArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className={styles.cta} aria-labelledby="editorial-cta-title">
        <p className="eyebrow">{sections.cta.eyebrow}</p>
        <h2 id="editorial-cta-title">{sections.cta.title}</h2>
        <div className={styles.ctaActions}>
          <p>{sections.cta.body}</p>
          <Link className="button button-primary" href={routes.consultation}>
            {sections.cta.buttonText}
          </Link>
          {sections.cta.secondaryLink ? (
            <Link className="text-link" href={sections.cta.secondaryLink.href}>
              {sections.cta.secondaryLink.label}
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
