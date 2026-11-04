import Link from "next/link";

import { brandConfig, routes } from "@/lib/brand";
import { buildPageMetadata } from "@/lib/metadata";
import styles from "./privacy.module.css";

export const metadata = buildPageMetadata("Privacy notice");

export default function PrivacyPage() {
  return (
    <main className={styles.main} id="main-content">
      <header className={styles.header}>
        <p className="eyebrow">Pre-launch draft</p>
        <h1>Privacy notice</h1>
        <p className={styles.lead}>
          This page is a working draft for {brandConfig.workingName} (temporary
          working name). It is not final legal copy and must be reviewed before
          production launch.
        </p>
      </header>

      <article className={styles.content}>
        <section className={styles.section}>
          <h2>What this notice covers</h2>
          <p>
            When you use the project consultation form, we collect the details
            you submit (such as your name, work email, project location, stage
            and message) so we can respond to your enquiry about windows, doors
            or glazing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How we use your information</h2>
          <p>
            We use your submission only to review your project enquiry and
            contact you about it using the details you provide. We do not use
            this site for advertising cookies or analytics in this phase, and
            no cookie-consent banner is present.
          </p>
          <p>
            A public telephone number and general inbox are not published on
            this site. Enquiries are accepted through the{" "}
            <Link className="text-link" href={routes.consultation}>
              project consultation form
            </Link>{" "}
            only. The data controller identity, registered address and staff
            contact details have not been published yet; they must appear here
            before launch.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Email delivery (Resend)</h2>
          <p>
            Consultation messages are sent to our team through Resend, our email
            delivery provider. Resend processes the message content and routing
            data needed to deliver mail. Their handling is governed by their
            service terms and privacy documentation.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Production blockers</h2>
          <p>
            Before go-live, the following must be confirmed and published here:
          </p>
          <ul>
            <li>Final data controller identity and contact details</li>
            <li>Registered business address and applicable legal entity name</li>
            <li>Retention periods and lawful basis for processing</li>
            <li>Data subject rights and complaint routes</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Consultation form</h2>
          <p>
            Submitting the consultation form indicates you understand this
            purpose. You can request a consultation from{" "}
            <Link className="text-link" href={routes.consultation}>
              the consultation page
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
