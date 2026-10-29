import { ConsultationForm } from "@/components/site/ConsultationForm";
import { buildPageMetadata } from "@/lib/metadata";
import styles from "./consultation.module.css";

export const metadata = buildPageMetadata("Consultation");

export default function ConsultationPage() {
  return (
    <main className={styles.main} id="main-content">
      <header className={styles.intro}>
        <p className="eyebrow">Project consultation</p>
        <h1>Start with the opening.</h1>
        <p>
          Tell us where the project stands, what the architecture asks of the
          envelope and where the critical decisions are forming.
        </p>
      </header>
      <section className={styles.formSection} aria-labelledby="form-title">
        <div>
          <p className="eyebrow">Project brief</p>
          <h2 id="form-title">Share the essentials.</h2>
          <p>
            Share the essentials below. We will follow up using the work email
            you provide.
          </p>
        </div>
        <ConsultationForm />
      </section>
    </main>
  );
}
