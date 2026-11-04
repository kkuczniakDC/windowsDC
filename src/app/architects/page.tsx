import { EditorialPage } from "@/components/site/EditorialPage";
import { architectsContent, getAllCategories } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

import architectsImage from "../../../assets/miguel-luis-r6uVcUq0I8E-unsplash.jpg";

export const metadata = buildPageMetadata(
  architectsContent.metadataTitle,
  architectsContent.metadataDescription,
);

export default function ArchitectsPage() {
  const categories = getAllCategories();

  return (
    <EditorialPage
      eyebrow={architectsContent.eyebrow}
      heroTitle={architectsContent.heroTitle}
      heroLede={architectsContent.heroLede}
      figure={{
        src: architectsImage,
        alt: "Timber window wall casting bands of daylight across a wooden floor",
        caption: "Visual reference · Light held by the opening",
        objectPosition: "18% 55%",
      }}
      categories={categories}
      sections={{
        thesisEyebrow: architectsContent.thesisEyebrow,
        thesisTitle: architectsContent.thesisTitle,
        thesisParagraphs: architectsContent.thesisParagraphs,
        process: {
          eyebrow: architectsContent.processEyebrow,
          title: architectsContent.processTitle,
          intro: architectsContent.processIntro,
          steps: architectsContent.processSteps,
        },
        brief: {
          eyebrow: architectsContent.briefEyebrow,
          title: architectsContent.briefTitle,
          paragraphs: architectsContent.briefParagraphs,
        },
        systemsEyebrow: architectsContent.systemsEyebrow,
        systemsTitle: architectsContent.systemsTitle,
        cta: {
          eyebrow: architectsContent.ctaEyebrow,
          title: architectsContent.ctaTitle,
          body: architectsContent.ctaBody,
          buttonText: architectsContent.ctaButtonText,
        },
      }}
    />
  );
}
