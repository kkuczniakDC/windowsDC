import Image from "next/image";
import Link from "next/link";

import daylightImage from "../../../assets/ej-li-afZTFY94vv0-unsplash.jpg";
import reflectionImage from "../../../assets/maxim-scheglov-TMauUlE9PxE-unsplash.jpg";
import { routes } from "@/lib/brand";
import { Hero } from "./Hero";
import { SignatureSequence } from "./SignatureSequence";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <div className={styles.thesisGrid}>
          <div className={styles.thesisHeading}>
            <p className="eyebrow">01 / The opening</p>
            <h2 id="thesis-title">An opening is never just an opening.</h2>
          </div>
          <div className={styles.thesisBody}>
            <p>
              It sets the rhythm of a façade, the quality of daylight, the
              silence of a room and the way inside meets out.
            </p>
            <p>
              We shape every system as part of the architecture—not an
              addition to it.
            </p>
          </div>
          <figure className={styles.thesisImage}>
            <Image
              src={daylightImage}
              alt="Late afternoon sunlight casting window-shaped shadows across a quiet interior"
              fill
              sizes="(min-width: 1200px) 66vw, (min-width: 768px) 72vw, 100vw"
            />
            <figcaption>Atmosphere study · Light finds depth</figcaption>
          </figure>
          <p className={styles.pullQuote}>
            Less frame.
            <br />
            More intention.
          </p>
        </div>
      </section>

      <section
        className={styles.systems}
        id="systems"
        aria-labelledby="systems-title"
      >
        <header className={styles.sectionHeader}>
          <p className="eyebrow">02 / Systems</p>
          <h2 id="systems-title">One architectural language. Every threshold.</h2>
          <p>
            A disciplined family of openings, composed around proportion,
            movement and the conditions of each site.
          </p>
        </header>
        <ol className={styles.systemList}>
          <li>
            <span>01</span>
            <h3>Windows</h3>
            <p>Disciplined sightlines for measured daylight and ventilation.</p>
            <span aria-hidden="true">↗</span>
          </li>
          <li>
            <span>02</span>
            <h3>Sliding doors</h3>
            <p>Large spans that move with ease and preserve visual continuity.</p>
            <span aria-hidden="true">↗</span>
          </li>
          <li>
            <span>03</span>
            <h3>Entrance doors</h3>
            <p>A precise first contact: proportion, tactility and security.</p>
            <span aria-hidden="true">↗</span>
          </li>
          <li>
            <span>04</span>
            <h3>Architectural glazing</h3>
            <p>Glazed walls resolved as an integral part of the building.</p>
            <span aria-hidden="true">↗</span>
          </li>
        </ol>
        <p className={styles.systemNote}>
          Product availability and specifications are confirmed for each
          market and project.
        </p>
      </section>

      <SignatureSequence />

      <section
        className={styles.performance}
        aria-labelledby="performance-title"
      >
        <header className={styles.performanceIntro}>
          <p className="eyebrow">04 / Performance</p>
          <h2 id="performance-title">Comfort, made architectural.</h2>
          <p>
            A beautiful opening must also manage heat, weather, sound and
            security. Aesthetic and technical decisions are resolved together,
            from the first drawing.
          </p>
        </header>
        <div className={styles.performanceList}>
          <article>
            <p>01</p>
            <h3>Thermal control</h3>
            <p>Configured around climate, orientation and glass specification.</p>
          </article>
          <article>
            <p>02</p>
            <h3>Acoustic calm</h3>
            <p>Assemblies selected around the sound conditions of each site.</p>
          </article>
          <article>
            <p>03</p>
            <h3>Weather integrity</h3>
            <p>System logic detailed around exposure and local conditions.</p>
          </article>
          <article>
            <p>04</p>
            <h3>Security</h3>
            <p>Hardware and access integrated without unnecessary visual noise.</p>
          </article>
        </div>
        <aside className={styles.technicalNote}>
          <span>Technical note</span>
          <p>
            Project-specific values, classifications and compliance documents
            are supplied only after the system and market are confirmed.
          </p>
        </aside>
      </section>

      <section
        className={styles.collaboration}
        id="architects"
        aria-labelledby="collaboration-title"
      >
        <div className={styles.collaborationIntro}>
          <p className="eyebrow">05 / Collaboration</p>
          <h2 id="collaboration-title">Built around the way architects work.</h2>
          <p>
            Early input prevents late compromise. We coordinate design intent,
            performance and delivery while the opening can still shape the
            architecture.
          </p>
          <Link className="text-link" href={routes.consultation}>
            Start a project conversation
          </Link>
        </div>
        <ol className={styles.process}>
          <li>
            <span>01</span>
            <div>
              <h3>Brief and climate</h3>
              <p>Define performance, scale and architectural intent.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Design development</h3>
              <p>Coordinate openings, interfaces, glass and hardware.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Technical resolution</h3>
              <p>Align drawings, samples and the details that matter.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Delivery planning</h3>
              <p>Protect the design through sequencing and site coordination.</p>
            </div>
          </li>
        </ol>
      </section>

      <section
        className={styles.atmospheres}
        id="atmospheres"
        aria-labelledby="atmospheres-title"
      >
        <header className={styles.atmosphereHeader}>
          <p className="eyebrow">06 / Atmosphere studies</p>
          <h2 id="atmospheres-title">What a well-made opening changes.</h2>
          <p>A visual study of light, reflection and shelter.</p>
        </header>
        <div className={styles.atmosphereGrid}>
          <figure className={styles.atmospherePrimary}>
            <Image
              src={reflectionImage}
              alt="Reflections of trees and warm evening light across a glazed modern façade"
              fill
              sizes="(min-width: 768px) 57vw, 100vw"
            />
            <figcaption>
              <span>Study 02</span>
              Reflection extends the architecture.
            </figcaption>
          </figure>
          <div className={styles.atmosphereStatement}>
            <p>Images create a direction, not a claim.</p>
            <p>
              The photography on this page is used as visual reference and
              does not represent completed projects by the brand.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <p className="eyebrow">07 / Begin</p>
        <h2 id="final-cta-title">
          Bring us in before the opening becomes a constraint.
        </h2>
        <div>
          <p>
            Share your project location, current stage, performance goals and
            timeline. We’ll help shape the right system strategy.
          </p>
          <Link className="button button-primary" href={routes.consultation}>
            Book a project consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
