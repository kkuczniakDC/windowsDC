import type { Metadata } from "next";

import { brandConfig } from "@/lib/brand";

export function buildRootMetadata(): Metadata {
  const title = brandConfig.workingName;

  return {
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description: brandConfig.description,
  };
}

export function buildPageMetadata(
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    description: description ?? brandConfig.description,
  };
}
