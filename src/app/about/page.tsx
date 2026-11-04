import { EditorialPage } from "@/components/site/EditorialPage";
import { routes } from "@/lib/brand";
import { aboutContent, getAllCategories } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

import aboutImage from "../../../assets/greyson-growth-yRcRrCIqxtw-unsplash.jpg";

export const metadata = buildPageMetadata(
  aboutContent.metadataTitle,
  aboutContent.metadataDescription,
);

export default function AboutPage() {
  const categories = getAllCategories();

  return (
    <EditorialPage
      eyebrow={aboutContent.eyebrow}
      heroTitle={aboutContent.heroTitle}
      heroLede={aboutContent.heroLede}
      figure={{
        src: aboutImage,
        alt: "Framed interior with fluted glass partitions, brick, and warm daylight",
        caption: "Visual reference · An inhabited envelope",
        objectPosition: "42% 40%",
      }}
      categories={categories}
      sections={{
        thesisEyebrow: aboutContent.thesisEyebrow,
        thesisTitle: aboutContent.thesisTitle,
        thesisParagraphs: aboutContent.thesisParagraphs,
        systemsEyebrow: aboutContent.systemsEyebrow,
        systemsTitle: aboutContent.systemsTitle,
        honesty: {
          label: aboutContent.honestyLabel,
          text: aboutContent.honestyText,
        },
        cta: {
          eyebrow: aboutContent.ctaEyebrow,
          title: aboutContent.ctaTitle,
          body: aboutContent.ctaBody,
          buttonText: aboutContent.ctaButtonText,
          secondaryLink: {
            href: routes.architects,
            label: aboutContent.architectsLinkLabel,
          },
        },
      }}
    />
  );
}
