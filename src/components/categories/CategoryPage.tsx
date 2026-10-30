import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import glazingStudy from "../../../assets/naomi-august-a14NxeTfMXE-unsplash.jpg";
import windowsStudy from "../../../assets/bundo-kim-MmagnTelMyo-unsplash.jpg";
import slidingStudy from "../../../assets/zhisheng-deng-W8FPl06Q4F4-unsplash.jpg";
import { ScrollDriftFigure } from "@/components/motion/ScrollDriftFigure";
import { routes } from "@/lib/brand";
import {
  getRelatedCategories,
  type CategoryContent,
  type CategoryFamily,
  type CategoryId,
} from "@/lib/content";
import { CategoryMedia, type CategoryMediaAspect } from "./CategoryMedia";
import { CategoryMotion } from "./CategoryMotion";
import styles from "./CategoryPage.module.css";

const inspirationByCategory: Partial<
  Record<CategoryId, { image: StaticImageData; alt: string }>
> = {
  windows: {
    image: windowsStudy,
    alt: "A tall framed window wall holding a quiet interior against trees",
  },
  "sliding-doors": {
    image: slidingStudy,
    alt: "A timber corridor continuing toward a glazed garden opening",
  },
  "architectural-glazing": {
    image: glazingStudy,
    alt: "A glazed roof holding sunlight over a paved courtyard",
  },
};

const heroAspect: Record<CategoryId, CategoryMediaAspect> = {
  windows: "frame",
  "sliding-doors": "panorama",
  "entrance-doors": "door",
  "architectural-glazing": "glass",
};

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

type CategoryPageProps = {
  category: CategoryContent;
};

export function CategoryPage({ category }: CategoryPageProps) {
  const related = getRelatedCategories(category.id);
  const inspiration = inspirationByCategory[category.id];
  const aspect = heroAspect[category.id];

  return (
    <CategoryMotion category={category.id}>
      <main
        className={styles.main}
        id="main-content"
        data-category={category.id}
      >
        <header className={styles.hero}>
          <div className={styles.heroCopy} data-motion="hero">
            <p className="eyebrow">{category.eyebrow}</p>
            <h1>{category.heroTitle}</h1>
            <p className={styles.lede}>{category.heroLede}</p>
          </div>
          <div
            className={styles.heroMedia}
            data-motion="hero-media"
          >
            <CategoryMedia
              aspect={aspect}
              label={category.title}
              tone="ink"
              nested={category.id === "windows"}
            />
          </div>
        </header>

        <section
          className={styles.thesis}
          aria-labelledby="category-thesis-title"
        >
          <p className="eyebrow">{category.thesisEyebrow}</p>
          <h2 id="category-thesis-title">{category.thesisTitle}</h2>
          <div className={styles.thesisBody}>
            {category.thesisBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <FamiliesSection category={category} aspect={aspect} />

        <section
          className={styles.details}
          aria-labelledby="category-details-title"
        >
          <header className={styles.sectionHeader}>
            <p className="eyebrow">{category.detailsEyebrow}</p>
            <h2 id="category-details-title">{category.detailsTitle}</h2>
            <p>{category.detailsIntro}</p>
          </header>
          <ul className={styles.detailList}>
            {category.details.map((detail, index) => (
              <li key={detail.title}>
                <span>{formatIndex(index)}</span>
                <h3>{detail.title}</h3>
                <p>{detail.body}</p>
              </li>
            ))}
          </ul>
          <aside className={styles.note}>
            <span>Technical note</span>
            <p>{category.detailsNote}</p>
          </aside>
        </section>

        <section
          className={styles.inspiration}
          aria-labelledby="category-inspiration-title"
        >
          <header className={styles.sectionHeader}>
            <p className="eyebrow">{category.inspirationEyebrow}</p>
            <h2 id="category-inspiration-title">
              {category.inspirationTitle}
            </h2>
            <p>{category.inspirationBody}</p>
          </header>
          {inspiration ? (
            <ScrollDriftFigure
              className={styles.inspirationFigure}
              travel={5}
              mobileTravel={2}
              caption={
                <figcaption>{category.inspirationCaption}</figcaption>
              }
            >
              <Image
                src={inspiration.image}
                alt={inspiration.alt}
                fill
                sizes="(min-width: 1200px) 70vw, 100vw"
              />
            </ScrollDriftFigure>
          ) : (
            <div className={styles.inspirationPlaceholder} data-motion="door">
              <CategoryMedia
                aspect="door"
                label={category.inspirationCaption}
                tone="paper"
                nested
              />
            </div>
          )}
        </section>

        <section
          className={styles.cta}
          aria-labelledby="category-cta-title"
        >
          <p className="eyebrow">{category.ctaEyebrow}</p>
          <h2 id="category-cta-title">{category.ctaTitle}</h2>
          <div className={styles.ctaActions}>
            <p>{category.ctaBody}</p>
            <Link className="button button-primary" href={routes.consultation}>
              Book a project consultation
            </Link>
          </div>
        </section>

        <nav className={styles.related} aria-labelledby="related-title">
          <header className={styles.relatedHeader}>
            <p className="eyebrow">Continue</p>
            <h2 id="related-title">The rest of the language.</h2>
            <Link className="text-link" href="/#systems">
              All systems
            </Link>
          </header>
          <ol className={styles.relatedList}>
            {related.map((item, index) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <span>{formatIndex(index)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.navSummary}</p>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </main>
    </CategoryMotion>
  );
}

function FamiliesSection({
  category,
  aspect,
}: {
  category: CategoryContent;
  aspect: CategoryMediaAspect;
}) {
  return (
    <section
      className={styles.families}
      aria-labelledby="category-families-title"
    >
      <header className={styles.sectionHeader}>
        <p className="eyebrow">{category.familiesEyebrow}</p>
        <h2 id="category-families-title">{category.familiesTitle}</h2>
        <p>{category.familiesIntro}</p>
      </header>
      <div className={styles.familyList}>
        {category.families.map((family, index) => (
          <FamilyBlock
            key={family.id}
            family={family}
            index={index}
            aspect={aspect}
            categoryId={category.id}
          />
        ))}
      </div>
    </section>
  );
}

function FamilyBlock({
  family,
  index,
  aspect,
  categoryId,
}: {
  family: CategoryFamily;
  index: number;
  aspect: CategoryMediaAspect;
  categoryId: CategoryId;
}) {
  const showMedia =
    categoryId === "windows" ||
    categoryId === "sliding-doors" ||
    (categoryId === "architectural-glazing" && index % 2 === 0);

  return (
    <article
      className={styles.family}
      id={family.id}
      data-motion="family"
    >
      <span className={styles.familyIndex}>{formatIndex(index)}</span>
      <div className={styles.familyCopy}>
        <h3>{family.title}</h3>
        <p>{family.summary}</p>
        {family.configurations.length > 0 ? (
          <p className={styles.familyMeta}>
            {family.configurations.join(" · ")}
          </p>
        ) : null}
      </div>
      {showMedia ? (
        <div
          className={styles.familyMedia}
          data-motion={categoryId === "sliding-doors" ? "panorama" : undefined}
        >
          <CategoryMedia
            aspect={aspect}
            label={family.title}
            tone="paper"
          />
        </div>
      ) : null}
    </article>
  );
}
